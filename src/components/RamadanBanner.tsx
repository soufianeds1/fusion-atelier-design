import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Star } from "lucide-react";

const entrees = [
  "Burrata (Classique ou Truffe Miel)",
  "Carpaccio de Bœuf",
  "Foie Gras",
  "Salade César",
];

const plats = [
  "Filetto al Pepe Verde",
  "Scaloppina Milanaise",
  "Scaloppina ai Funghi",
  "Rigatoni Alfredo",
  "Filetto di Pesce",
  "Ravioli al Tartufo",
];

const accompagnements = [
  "Pâtes à la crème",
  "Riz sauce champignons",
  "Frites",
  "Légumes sautés à la plancha",
  "Pomme grenaille",
  "Purée de pommes de terre",
];

export function RamadanBanner() {
  return (
    <section className="py-24 relative overflow-hidden bg-card">
      {/* Decorative crescents */}
      <div className="absolute top-8 left-8 text-accent/10">
        <Moon size={120} />
      </div>
      <div className="absolute bottom-8 right-8 text-accent/10">
        <Moon size={80} />
      </div>
      <div className="absolute top-16 right-20 text-accent/10">
        <Star size={40} />
      </div>
      <div className="absolute bottom-20 left-24 text-accent/10">
        <Star size={30} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Moon size={18} className="text-accent" />
            <p className="text-accent uppercase tracking-[0.3em] text-sm font-medium">
              Ramadan Moubarak
            </p>
            <Moon size={18} className="text-accent" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Formule Ramadan
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-2">
            Entrée · Plat <span className="text-accent mx-1">ou</span> Plat · Dessert
          </p>
          <p className="text-muted-foreground text-sm">
            Lait, dattes et chorba ou harira inclus
          </p>
          <div className="mt-6">
            <span className="inline-block font-display text-5xl md:text-6xl font-semibold text-accent">
              49€
            </span>
            <span className="text-muted-foreground text-lg ml-2">par personne</span>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Entrées */}
          <div className="bg-background border border-border rounded-lg p-6 hover:border-accent/30 transition-colors">
            <h3 className="font-display text-xl font-semibold text-accent mb-4 text-center">
              Entrées
            </h3>
            <ul className="space-y-3">
              {entrees.map((item) => (
                <li key={item} className="text-muted-foreground text-sm flex items-start gap-2">
                  <Star size={12} className="text-accent mt-1 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Plats */}
          <div className="bg-background border border-accent/30 rounded-lg p-6 shadow-[0_0_30px_hsl(43_68%_52%/0.08)]">
            <h3 className="font-display text-xl font-semibold text-accent mb-4 text-center">
              Plats
            </h3>
            <ul className="space-y-3">
              {plats.map((item) => (
                <li key={item} className="text-muted-foreground text-sm flex items-start gap-2">
                  <Star size={12} className="text-accent mt-1 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Accompagnements */}
          <div className="bg-background border border-border rounded-lg p-6 hover:border-accent/30 transition-colors">
            <h3 className="font-display text-xl font-semibold text-accent mb-4 text-center">
              Accompagnements
            </h3>
            <ul className="space-y-3">
              {accompagnements.map((item) => (
                <li key={item} className="text-muted-foreground text-sm flex items-start gap-2">
                  <Star size={12} className="text-accent mt-1 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="gold" size="xl" asChild>
            <Link to="/reservation">Réserver pour l'Iftar</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
