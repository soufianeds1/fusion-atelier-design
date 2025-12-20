import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, AlertTriangle } from "lucide-react";
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function NewYearCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const newYear = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);
      
      // If we're already past midnight on Jan 1st, target next year
      if (now >= newYear) {
        newYear.setFullYear(newYear.getFullYear() + 1);
      }

      const difference = newYear.getTime() - now.getTime();

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-wine to-wine-light rounded-lg flex items-center justify-center border border-gold/30 shadow-[0_0_30px_hsl(0_45%_30%/0.3)]">
          <span className="font-display text-3xl md:text-5xl font-bold text-cream">
            {value.toString().padStart(2, "0")}
          </span>
        </div>
        <div className="absolute -inset-0.5 bg-gradient-to-br from-gold/20 to-transparent rounded-lg -z-10 blur-sm" />
      </div>
      <span className="mt-3 text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
    </div>
  );

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-midnight/30 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-wine/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4">
            Réveillon du Nouvel An
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Compte à Rebours <span className="italic text-accent">2025</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Célébrez la nouvelle année dans un cadre d'exception. Réservez votre table pour une soirée inoubliable.
          </p>
        </div>

        <div className="flex justify-center gap-3 md:gap-6 mb-12">
          <TimeBlock value={timeLeft.days} label="Jours" />
          <TimeBlock value={timeLeft.hours} label="Heures" />
          <TimeBlock value={timeLeft.minutes} label="Minutes" />
          <TimeBlock value={timeLeft.seconds} label="Secondes" />
        </div>

        {/* WhatsApp Only Alert */}
        <div className="max-w-xl mx-auto mb-8 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
          <div className="flex items-center gap-3 text-center justify-center">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
            <p className="text-foreground text-sm font-medium">
              Réservation Nouvel An <span className="text-destructive font-bold">UNIQUEMENT via WhatsApp</span> (acompte obligatoire)
            </p>
          </div>
        </div>

        {/* Menu du Nouvel An */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Menu */}
          <div className="bg-background/50 backdrop-blur-sm border border-border rounded-lg p-6">
            <h3 className="font-display text-2xl text-accent mb-4 text-center">Menu New Year 2026</h3>
            <p className="text-center text-muted-foreground text-sm mb-6">Amuse bouche • Coupe apéritive</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-display text-lg text-accent/80 italic mb-2">Entrées</h4>
                <ul className="text-sm text-muted-foreground space-y-1 text-center">
                  <li>Burrata</li>
                  <li>Carpaccio de bœuf</li>
                  <li>Foie gras, chutney de figue</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-display text-lg text-accent/80 italic mb-2">Plats principaux</h4>
                <ul className="text-sm text-muted-foreground space-y-1 text-center">
                  <li>Filetto al pepe verde</li>
                  <li>Filetto di salmone</li>
                  <li>Ravioli al tartuffo</li>
                  <li>Scaloppina bella milanaise</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-display text-lg text-accent/80 italic mb-2">Accompagnements au choix</h4>
                <ul className="text-sm text-muted-foreground space-y-1 text-center">
                  <li>Pomme grenaille • Purée de pomme de terre</li>
                  <li>Frites • Pâtes à la crème</li>
                  <li>Légumes sautés à la plancha • Riz sauce champignons</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-display text-lg text-accent/80 italic mb-2">Desserts</h4>
                <ul className="text-sm text-muted-foreground space-y-1 text-center">
                  <li>Fondant au chocolat</li>
                  <li>Pavlova fruits rouges</li>
                  <li>Mille feuille renversé</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Services & Animation */}
          <div className="space-y-6">
            <div className="bg-background/50 backdrop-blur-sm border border-border rounded-lg p-6">
              <h4 className="font-display text-xl text-accent mb-4 text-center">Services & Tarifs</h4>
              <div className="space-y-3 text-center">
                <div className="flex justify-between items-center px-4 py-2 bg-wine/10 rounded">
                  <span className="text-foreground">19h à 21h</span>
                  <span className="text-accent font-bold text-lg">99€</span>
                </div>
                <div className="flex justify-between items-center px-4 py-2 bg-wine/20 rounded">
                  <span className="text-foreground">21h à 23h</span>
                  <span className="text-accent font-bold text-lg">119€</span>
                </div>
                <div className="flex justify-between items-center px-4 py-2 bg-wine/30 rounded">
                  <span className="text-foreground">23h à 02h</span>
                  <span className="text-accent font-bold text-lg">139€</span>
                </div>
              </div>
            </div>
            
            <div className="bg-background/50 backdrop-blur-sm border border-border rounded-lg p-6">
              <h4 className="font-display text-xl text-accent mb-4 text-center">Animation</h4>
              <ul className="text-muted-foreground space-y-2 text-center">
                <li>🎷 Saxophoniste</li>
                <li>🎩 Magicien</li>
                <li>💃 Danseuse brésilienne</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full mt-10">
          <Button variant="gold" size="xl" asChild>
            <a 
              href="https://wa.me/33753236352?text=Bonjour%2C%20je%20souhaite%20réserver%20pour%20le%20Réveillon%20du%20Nouvel%20An." 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MessageCircle size={20} />
              Réserver sur WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
