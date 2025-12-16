import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

        <div className="text-center">
          <Button variant="gold" size="xl" asChild>
            <Link to="/reservation">Réserver pour le Réveillon</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
