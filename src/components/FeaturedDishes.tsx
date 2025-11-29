import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";

const dishes = [
  {
    name: "Tataki de Thon Fusion",
    description:
      "Thon rouge mi-cuit, condiment yuzu-gingembre, émulsion de wasabi et julienne de légumes croquants.",
    price: "24€",
    image: dish1,
    category: "Signature",
  },
  {
    name: "Crevettes Tempura Royale",
    description:
      "Crevettes black tiger en tempura légère, sauce sweet chili maison et émulsion de citron vert.",
    price: "18€",
    image: dish2,
    category: "À Partager",
  },
  {
    name: "Burrata di Puglia",
    description:
      "Crémeuse burrata, tomates confites au basilic thaï, huile d'olive infusée et fleur de sel.",
    price: "16€",
    image: dish3,
    category: "À Partager",
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
            Une sélection de nos plats signatures, où la créativité rencontre la tradition.
          </p>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
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
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display text-xl font-semibold group-hover:text-accent transition-colors">
                    {dish.name}
                  </h3>
                  <span className="text-accent font-display text-xl font-semibold">
                    {dish.price}
                  </span>
                </div>
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
