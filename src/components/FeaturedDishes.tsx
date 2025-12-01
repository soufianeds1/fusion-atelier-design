import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import filettoTartufo from "@/assets/filetto-tartufo.jpg";
import rigatoniNorma from "@/assets/rigatoni-norma.jpg";
import linguineBolognese from "@/assets/linguine-bolognese.jpg";
import bresaola from "@/assets/bresaola.jpg";

const dishes = [
  {
    name: "Filetto al Tartufo",
    description:
      "Filet de bœuf nappé d'une sauce à la truffe.",
    image: filettoTartufo,
    category: "Carne",
  },
  {
    name: "Rigatoni al Norma",
    description:
      "Rigatoni, tomates cerise, aubergine, ail, émincé de bœuf, ricotta.",
    image: rigatoniNorma,
    category: "Pasta",
  },
  {
    name: "Linguine alla Bolognese",
    description:
      "Linguine à la sauce tomate et à la viande hachée.",
    image: linguineBolognese,
    category: "Pasta",
  },
  {
    name: "La Bresaola",
    description:
      "Sauce tomate, Bresaola, Mozzarella Fior Di Latte, basilic, roquette.",
    image: bresaola,
    category: "Pizza",
  },
];

export function FeaturedDishes() {
  return (
    <section className="py-24 bg-card relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-accent uppercase tracking-[0.3em] text-sm font-medium mb-4">
            Nos Créations
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
            Les Incontournables
          </h2>
          <p className="text-muted-foreground text-lg">
            Une sélection de nos plats signatures, où la créativité rencontre la tradition italienne.
          </p>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dishes.map((dish) => (
            <div
              key={dish.name}
              className="group relative overflow-hidden rounded-lg bg-background border border-border hover:border-accent/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-wine/90 text-cream text-xs uppercase tracking-wider px-3 py-1 rounded-sm">
                  {dish.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold group-hover:text-accent transition-colors mb-3">
                  {dish.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {dish.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/carte">Voir toute la Carte</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
