import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReservationNotificationRequest {
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  guests: number;
  message: string;
  depositAmount: number;
  depositConfirmed: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ReservationNotificationRequest = await req.json();
    
    console.log("Received reservation notification request:", data);

    const { 
      name, 
      email, 
      phone, 
      date, 
      service, 
      guests, 
      message, 
      depositAmount, 
      depositConfirmed 
    } = data;

    // Send notification email to restaurant
    const emailResponse = await resend.emails.send({
      from: "Morello Réservations <onboarding@resend.dev>",
      to: ["contact@morello-paris.fr"],
      subject: `🍽️ Nouvelle réservation ${guests}+ pers. - ${name}`,
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
            .deposit-box { background: ${depositConfirmed ? '#d4edda' : '#fff3cd'}; border: 1px solid ${depositConfirmed ? '#c3e6cb' : '#ffc107'}; padding: 15px; border-radius: 8px; margin-top: 20px; }
            .deposit-status { font-weight: bold; color: ${depositConfirmed ? '#155724' : '#856404'}; }
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
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Téléphone</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              <div class="field">
                <div class="label">Date</div>
                <div class="value">${date}</div>
              </div>
              <div class="field">
                <div class="label">Service</div>
                <div class="value">${service}</div>
              </div>
              <div class="field">
                <div class="label">Nombre de convives</div>
                <div class="value">${guests} personnes</div>
              </div>
              ${message ? `
              <div class="field">
                <div class="label">Message</div>
                <div class="value">${message}</div>
              </div>
              ` : ''}
              
              <div class="deposit-box">
                <div class="label">Caution PayPal</div>
                <div class="value">
                  <span class="deposit-status">${depositConfirmed ? '✅ Confirmé par le client' : '⚠️ Non confirmé'}</span>
                  <br>
                  Montant attendu: <strong>${depositAmount}€</strong>
                </div>
              </div>
              
              <div class="warning">
                <strong>⚠️ Action requise:</strong> Vérifiez sur votre compte PayPal que le paiement de ${depositAmount}€ a bien été reçu de la part de ${name}.
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
