import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReservationNotificationRequest {
  reservationId: string;
}

// Input validation
function validateUUID(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

// Sanitize string for HTML output
function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const data: ReservationNotificationRequest = await req.json();
    
    console.log("Received reservation notification request for ID:", data.reservationId);

    // Validate reservation ID
    if (!data.reservationId || !validateUUID(data.reservationId)) {
      console.error("Invalid reservation ID provided");
      return new Response(
        JSON.stringify({ error: "Invalid reservation ID" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create Supabase client with service role to bypass RLS
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify reservation exists in database
    const { data: reservation, error: dbError } = await supabase
      .from("reservations")
      .select("*")
      .eq("id", data.reservationId)
      .single();

    if (dbError || !reservation) {
      console.error("Reservation not found:", dbError);
      return new Response(
        JSON.stringify({ error: "Reservation not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Only send notification for groups of 6+
    if (reservation.guests < 6) {
      console.log("Reservation does not require notification (less than 6 guests)");
      return new Response(
        JSON.stringify({ success: true, message: "No notification needed" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { 
      name, 
      email, 
      phone, 
      date, 
      service, 
      guests, 
      message, 
      deposit_amount,
    } = reservation;

    // Sanitize all user inputs for HTML
    const safeName = sanitizeHtml(name);
    const safeEmail = sanitizeHtml(email);
    const safePhone = sanitizeHtml(phone);
    const safeDate = sanitizeHtml(date);
    const safeService = sanitizeHtml(service);
    const safeMessage = message ? sanitizeHtml(message) : '';

    // Send notification email to restaurant
    const emailResponse = await resend.emails.send({
      from: "Morello Réservations <onboarding@resend.dev>",
      to: ["contact@morello-paris.fr"],
      subject: `🍽️ Nouvelle réservation ${guests}+ pers. - ${safeName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1a1a1a, #2a2a2a); color: #d4af37; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; }
            .value { font-size: 16px; color: #333; margin-top: 4px; }
            .deposit-box { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin-top: 20px; }
            .deposit-status { font-weight: bold; color: #856404; }
            .footer { text-align: center; padding: 15px; color: #666; font-size: 12px; }
            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 10px 15px; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">Nouvelle Réservation</h1>
              <p style="margin: 10px 0 0; opacity: 0.9;">Groupe de ${guests} personnes</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nom</div>
                <div class="value">${safeName}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
              </div>
              <div class="field">
                <div class="label">Téléphone</div>
                <div class="value"><a href="tel:${safePhone}">${safePhone}</a></div>
              </div>
              <div class="field">
                <div class="label">Date</div>
                <div class="value">${safeDate}</div>
              </div>
              <div class="field">
                <div class="label">Service</div>
                <div class="value">${safeService}</div>
              </div>
              <div class="field">
                <div class="label">Nombre de convives</div>
                <div class="value">${guests} personnes</div>
              </div>
              ${safeMessage ? `
              <div class="field">
                <div class="label">Message</div>
                <div class="value">${safeMessage}</div>
              </div>
              ` : ''}
              
              <div class="deposit-box">
                <div class="label">Caution PayPal</div>
                <div class="value">
                  <span class="deposit-status">⏳ À vérifier</span>
                  <br>
                  Montant attendu: <strong>${deposit_amount || guests * 10}€</strong>
                </div>
              </div>
              
              <div class="warning">
                <strong>⚠️ Action requise:</strong> Vérifiez sur votre compte PayPal que le paiement de ${deposit_amount || guests * 10}€ a bien été reçu de la part de ${safeName}.
              </div>
            </div>
            <div class="footer">
              Réservation reçue le ${new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-reservation-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
