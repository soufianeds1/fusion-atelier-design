import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-restaurant.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="L'Éclipse - Intérieur du restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-wine/20 to-midnight/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center pt-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Tagline */}
          <p
            className="text-accent uppercase tracking-[0.3em] text-sm md:text-base font-medium opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Restaurant Fusion • Paris
          </p>

          {/* Main Headline */}
          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-tight opacity-0 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            Un Voyage<br />
            <span className="italic text-accent">Hors du Temps</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            Laissez-vous emporter par une expérience culinaire unique où les saveurs 
            d'Asie rencontrent l'élégance française dans un cadre d'exception.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <Button variant="gold" size="xl" asChild>
              <Link to="/reservation">Réserver une table</Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/carte">Découvrir la Carte</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
