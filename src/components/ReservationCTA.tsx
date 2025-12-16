import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";

export function ReservationCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-wine/20 via-background to-midnight/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-wine/10 via-transparent to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent uppercase tracking-[0.3em] text-sm font-medium mb-4">
            Réservation
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
            Votre Table vous Attend
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Pour une soirée inoubliable, réservez votre table dès maintenant. 
            Privatisation disponible pour vos événements.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="gold" size="xl" asChild>
              <Link to="/reservation" className="flex items-center gap-2">
                <Calendar size={20} />
                Réserver en Ligne
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="tel:0753236352" className="flex items-center gap-2">
                <Phone size={20} />
                07 53 23 63 52
              </a>
            </Button>
          </div>

          {/* Payment & Services Info */}
          <div className="mt-8 space-y-2 text-sm text-muted-foreground">
            <p><span className="text-foreground font-medium">Au restaurant :</span> Carte bancaire • Espèces</p>
            <p><span className="text-foreground font-medium">Acompte réservation :</span> PayPal ou espèces sur place</p>
            <p className="text-accent">🚗 Service voiturier disponible le week-end (Ven-Sam-Dim)</p>
          </div>
        </div>
      </div>
    </section>
  );
}