import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const menuCategories = [
  {
    name: "À Partager",
    description: "Commencez votre voyage culinaire",
    items: [
      {
        name: "Nems au Poulet Maison",
        description: "Croustillants nems de poulet mariné, sauce nuoc-mâm maison",
        price: "11€",
      },
      {
        name: "Crevettes Tempura Royale",
        description: "Crevettes black tiger en tempura légère, sauce sweet chili",
        price: "14€",
      },
      {
        name: "Chicken Dynamite",
        description: "Poulet croustillant, mayonnaise épicée au sriracha, oignons frits",
        price: "13€",
      },
      {
        name: "Tacos Crevettes",
        description: "Mini tacos croustillants, crevettes marinées, guacamole wasabi",
        price: "14€",
      },
      {
        name: "Crispy Saumon Avocat",
        description: "Tartare de saumon, avocat crémeux, chips de wonton croustillantes",
        price: "15€",
      },
      {
        name: "Burrata di Puglia",
        description: "Crémeuse burrata, tomates confites au basilic thaï, huile d'olive",
        price: "16€",
      },
    ],
  },
  {
    name: "Les Signatures",
    description: "Les créations uniques de notre Chef",
    items: [
      {
        name: "Tataki de Thon Fusion",
        description: "Thon rouge mi-cuit, condiment yuzu-gingembre, émulsion de wasabi",
        price: "26€",
      },
      {
        name: "Bœuf Wagyu Grillé",
        description: "Wagyu A5 grillé au binchotan, purée truffée, jus corsé",
        price: "45€",
      },
      {
        name: "Canard Laqué Revisité",
        description: "Magret de canard laqué au miso, légumes de saison rôtis",
        price: "32€",
      },
      {
        name: "Saint-Jacques Snackées",
        description: "Noix de Saint-Jacques dorées, beurre blanc au yuzu, caviar d'aubergine",
        price: "34€",
      },
      {
        name: "Filet de Bar en Croûte",
        description: "Bar de ligne en croûte d'herbes, risotto crémeux aux champignons",
        price: "29€",
      },
    ],
  },
  {
    name: "Formules Déjeuner",
    description: "Du lundi au vendredi, de 12h à 15h",
    items: [
      {
        name: "Formule Express",
        description: "Plat du jour + café",
        price: "14,90€",
      },
      {
        name: "Formule Gourmande",
        description: "Plat du jour + dessert du jour",
        price: "17,90€",
      },
      {
        name: "Formule Complète",
        description: "Entrée + plat + dessert au choix",
        price: "22,90€",
      },
    ],
  },
  {
    name: "Desserts",
    description: "Finir en beauté",
    items: [
      {
        name: "Fondant au Chocolat Noir",
        description: "Cœur coulant au chocolat Valrhona, glace vanille bourbon",
        price: "12€",
      },
      {
        name: "Cheesecake Yuzu",
        description: "Cheesecake aérien au yuzu, coulis de fruits exotiques",
        price: "11€",
      },
      {
        name: "Mochi Glacés (3 pièces)",
        description: "Assortiment de mochis glacés maison du jour",
        price: "9€",
      },
    ],
  },
];

const Carte = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-hero-gradient">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-accent uppercase tracking-[0.3em] text-sm font-medium mb-4">
              Cuisine Fusion
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6">
              La Carte
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Une invitation au voyage à travers nos créations où se mêlent 
              traditions françaises et influences asiatiques.
            </p>
          </div>
        </section>

        {/* Menu Sections */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-20">
              {menuCategories.map((category) => (
                <div key={category.name}>
                  {/* Category Header */}
                  <div className="text-center mb-10">
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-2">
                      {category.name}
                    </h2>
                    <p className="text-muted-foreground">{category.description}</p>
                    <div className="mt-4 flex justify-center">
                      <div className="w-20 h-px bg-accent" />
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-6">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="group flex justify-between items-start gap-4 pb-6 border-b border-border/50 hover:border-accent/30 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="font-display text-xl font-medium text-foreground group-hover:text-accent transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            {item.description}
                          </p>
                        </div>
                        <span className="text-accent font-display text-xl font-semibold whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            <div className="max-w-4xl mx-auto mt-16 text-center">
              <p className="text-muted-foreground text-sm">
                Tous nos plats sont préparés sur place avec des produits frais et de saison.
                <br />
                Merci de nous signaler toute allergie ou intolérance alimentaire.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Carte;
