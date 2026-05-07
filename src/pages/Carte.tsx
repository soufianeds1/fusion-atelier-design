import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const menuCategories = [
  {
    id: "antipasti",
    name: "Antipasti",
    description: "Nos entrées italiennes",
    items: [
      { name: "Burrata Classica", description: "Burrata crémeuse, roquette, tomates cerise, crème balsamique, pesto", price: "16€" },
      { name: "Burrata Tartufo et Miel", description: "Burrata crémeuse, miel, truffe, tomate cerise, roquette, crème", price: "19€" },
      { name: "Burrata Avalto", description: "Burrata enrobée d'une pâte, jambon, sauce tomate, crème balsamique", price: "23€" },
      { name: "Mozzarella Frita", description: "Bouchée de mozzarella croquante sur son lit de pesto rosso et verde", price: "17€" },
      { name: "Foie Gras", description: "Pain toasté, tranche de foie gras, chutney de figue", price: "19€" },
      { name: "Trio Bruschetta", description: "Pain toasté, foie gras, chèvre miel, stracciatella truffe", price: "23€" },
      { name: "Stracciatella", description: "Miel, pistache / Miel, truffe", price: "17€" },
      { name: "Carpaccio di Manzo", description: "Émincé de bœuf tranché, roquette, pesto basilic, copeaux de parmesan, crème balsamique (Supplément burrata +7€)", price: "19€" },
      { name: "4 Mini Pizza", description: "Chèvre, truffe, saumon, margarita", price: "18€" },
      { name: "Insalata César", description: "Laitue romaine, tomates cerise, poulet pané, croûtons, parmesan, sauce César maison, crème balsamique", price: "21€" },
      { name: "Assiette de Charcuteries à Partager", description: "Sélection de charcuteries d'exception", price: "29€" },
      { name: "Calamari Fritti", description: "Assiette de calamars frits, spicy mayo", price: "17€" },
    ],
  },
  {
    id: "carne",
    name: "Carne",
    description: "Nos viandes sélectionnées",
    items: [
      { name: "Filetto al Tartufo", description: "Filet de bœuf nappé d'une sauce à la truffe", price: "43€" },
      { name: "Filetto al Pepe Verde", description: "Filet de bœuf servi avec une sauce au poivre vert", price: "39€" },
      { name: "Filetto del Capo (Rossini)", description: "Filet de bœuf accompagné d'une sauce au foie gras", price: "45€" },
      { name: "Filetto alla Senape", description: "Filet de bœuf, sauce à la moutarde à l'ancienne, stracciatella et oignons caramélisés", price: "40€" },
    ],
  },
  {
    id: "pesce",
    name: "Pesce",
    description: "Nos poissons et fruits de mer",
    items: [
      { name: "Filetto di Pesce", description: "Filet de bar cuit à la plancha avec une sauce vierge", price: "32€" },
      { name: "Filetto di Salmone", description: "Pavé de saumon grillé à la plancha, accompagné d'une sauce rose", price: "29€" },
      { name: "Filetto di Salmone al Miele e Pistacchio", description: "Pavé de saumon en croûte de miel et pistache", price: "31€" },
    ],
  },
  {
    id: "pollo",
    name: "Pollo",
    description: "Nos spécialités de poulet",
    items: [
      { name: "Scaloppina alla Parmigiana", description: "Escalope de poulet surmontée d'aubergines frites, sauce tomate et mozzarella gratinée", price: "29€" },
      { name: "Scaloppina alla Saltimbocca", description: "Escalope de poulet garnie de jambon et de crème, gratinée à la mozzarella", price: "27€" },
      { name: "Scaloppina bella Milanaise", description: "Escalope de poulet panée avec roquette, copeaux de parmesan et sauce napolitaine", price: "27€" },
      { name: "Scaloppina ai Funghi", description: "Escalope de poulet à la crème de champignons", price: "27€" },
    ],
  },
  {
    id: "pasta",
    name: "Pasta",
    description: "Nos pâtes artisanales",
    items: [
      { name: "Linguine all'Arrabbiata", description: "Linguine à la sauce tomate, ail et huile d'olive", price: "23€" },
      { name: "Lasagne alla Bolognese", description: "Feuilles de pâtes superposées avec une sauce bolognaise à base de viande et de béchamel", price: "25€" },
      { name: "Ravioli al Tartufo", description: "Pâtes farcies à la truffe, accompagnées d'une sauce crémeuse truffée", price: "28€" },
      { name: "Linguine al Tartufo", description: "Linguine à la crème de truffe (supplément poulet +5€)", price: "28€" },
      { name: "Linguine al Pesto e Burrata", description: "Linguine au pesto de basilic, surmontée de sa burrata crémeuse", price: "26€" },
      { name: "Linguine alla Bolognese", description: "Linguine à la sauce tomate et à la viande hachée", price: "25€" },
      { name: "Linguine alla Carbonara", description: "Linguine, crème, jaune d'œuf, lardons de bœuf et pecorino", price: "25€" },
      { name: "Rigatoni al Salmone", description: "Rigatoni, saumon, tomates cerises, crème, ail basilic, huile d'olive", price: "27€" },
      { name: "Rigatoni Alfredo", description: "Rigatoni, poulet, champignons et une sauce crémeuse", price: "27€" },
      { name: "Rigatoni al Norma", description: "Rigatoni, tomates cerise, aubergine, ail, émincé de bœuf, ricotta", price: "28€" },
    ],
  },
  {
    id: "pizze",
    name: "Pizze",
    description: "Nos pizzas au feu de bois",
    items: [
      { name: "Margarita", description: "Sauce tomate, Mozzarella Fior Di Latte, Basilic", price: "23€" },
      { name: "Formaggi", description: "Crème, Mozzarella Fior Di Latte, Ricotta, Gorgonzola, Chèvre", price: "26€" },
      { name: "Chèvre Miel", description: "Crème, Chèvre, Mozzarella Fior Di Latte, Miel, Noix, Roquette", price: "25€" },
      { name: "Salmone", description: "Crème, Saumon fumé, Mozzarella Fior Di Latte, Roquette", price: "28€" },
      { name: "Tartufata", description: "Crème de truffe, Stracciatella, champignons, Mozzarella Fior Di Latte, Roquette", price: "32€" },
      { name: "Al Norma", description: "Sauce tomate, Mozzarella Fior Di Latte, aubergine, émincé de filet de bœuf, ricotta", price: "29€" },
      { name: "Regina", description: "Sauce tomate, jambon, champignons, Mozzarella Fior Di Latte", price: "26€" },
      { name: "La Bresaola", description: "Sauce tomate, Bresaola, Mozzarella Fior Di Latte, basilic, roquette", price: "29€" },
      { name: "La Pollo & Pesto", description: "Pesto, émincé de poulet, Stracciatella, tomates cerises", price: "27€" },
      { name: "La Mama Mia...", description: "Sauce tomate, bœuf haché, émincé de poulet, Mozzarella Fior Di Latte, basilic", price: "27€" },
    ],
  },
  {
    id: "contorni",
    name: "Contorni",
    description: "Nos accompagnements — 1 au choix inclus, supplément 6€",
    items: [
      { name: "Pomme grenaille", description: "", price: "" },
      { name: "Purée de pommes de terre", description: "", price: "" },
      { name: "Frites", description: "", price: "" },
      { name: "Pâtes à la crème", description: "", price: "" },
      { name: "Salade", description: "", price: "" },
      { name: "Légumes sautés à la plancha", description: "", price: "" },
      { name: "Riz sauce champignons", description: "", price: "" },
    ],
  },
  {
    id: "dolce",
    name: "Dolce",
    description: "Nos desserts",
    items: [
      { name: "Tiramisu", description: "Café, Nutella, Pistache, Fruits rouges, Mangue, Figue", price: "12€" },
      { name: "Pavlova Fruits Rouges", description: "Meringue concassée, crème montée, coulis et fruits rouges frais", price: "18€" },
      { name: "Pain Perdu", description: "Nutella ou Caramel", price: "12€" },
      { name: "Fondant au Chocolat", description: "Accompagné de crème anglaise et chantilly", price: "12€" },
      { name: "Cheese Cake", description: "Fruits rouges ou Mangue", price: "12€" },
      { name: "Crème Brûlée", description: "Crème vanillée, sucre caramélisé craquant", price: "12€" },
      { name: "Mousse au Chocolat", description: "Nuage de chocolat intense et gourmand", price: "12€" },
      { name: "Panna Cotta", description: "Douceur vanillée, surmontée de fruits rouges", price: "12€" },
      { name: "Mille Feuille Renversé", description: "Feuilleté croustillant, ganache vanillée", price: "16€" },
      { name: "Assiette de Fruits à Partager", description: "Assortiment de nos meilleurs fruits de saison", price: "15€ / 26€" },
    ],
  },
  {
    id: "boissons",
    name: "Boissons",
    description: "Nos boissons fraîches",
    items: [
      { name: "Coca-Cola / Cherry / Zéro", description: "", price: "7€" },
      { name: "Sprite / Oasis / Ice-Tea", description: "", price: "7€" },
      { name: "San-Pellegrino / Evian", description: "", price: "7€" },
      { name: "Evian 1L / San-Pellegrino 1L", description: "", price: "12€" },
      { name: "Red Bull*", description: "", price: "7€" },
      { name: "Thé Glacé*", description: "", price: "7€" },
      { name: "Thé à la Menthe*", description: "", price: "6€" },
      { name: "Café", description: "", price: "4€" },
      { name: "Supplément Sirop", description: "", price: "1€" },
    ],
  },
  {
    id: "mocktails",
    name: "Mocktails",
    description: "Nos cocktails sans alcool",
    items: [
      { name: "Virgin Mojito*", description: "Limonade, menthe, sucre de canne, citron vert (Fraise ou Passion +2€)", price: "10€" },
      { name: "Le Rose Bonbon*", description: "Litchi, framboise, citron vert", price: "10€" },
      { name: "Le Sun Set*", description: "Cranberry, ananas, orange, grenadine", price: "10€" },
      { name: "Blue Wave*", description: "Passion, ananas, curaçao", price: "10€" },
      { name: "Piña Colada*", description: "Ananas, lait de coco", price: "10€" },
    ],
  },
  {
    id: "lounge",
    name: "Lounge",
    description: "Notre carte chicha",
    items: [],
  },
];

const categories = ["antipasti", "carne", "pesce", "pollo", "pasta", "pizze", "contorni", "dolce", "boissons", "mocktails", "lounge"];

const hookahMenu = {
  happyHour: {
    title: "Happy Hour 15h-18h",
    items: [
      { name: "Hookah + Soft", price: "20€" },
      { name: "Hookah + Soft Premium", price: "25€" },
      { name: "Hookah Quasar + Soft", price: "30€" },
      { name: "Hookah Quasar + Soft Premium", price: "35€" },
    ],
  },
  soiree: {
    title: "Formule Soirée",
    items: [
      { name: "Hookah + Soft", price: "25€" },
      { name: "Hookah + Soft Premium*", price: "30€" },
      { name: "Hookah Quasar + Soft", price: "35€" },
      { name: "Hookah Quasar + Soft Premium*", price: "40€" },
    ],
  },
  saveurs: ["Hawai", "Love 66", "Mi Amor", "Lady Killer", "Menthe", "Pomme"],
};

const Carte = () => {
  const [activeCategory, setActiveCategory] = useState<string>("antipasti");

  useEffect(() => {
    const timer = setTimeout(() => {
      const hash = window.location.hash.replace("#", "");
      const targetId = hash && categories.includes(hash) ? hash : "antipasti";
      setActiveCategory(targetId);
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-hero-gradient">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-accent uppercase tracking-[0.3em] text-sm font-medium mb-4">
              Restaurant Italien
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-semibold mb-4">
              La Carte
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
              Découvrez notre sélection de plats italiens authentiques, préparés avec des produits frais et de saison.
            </p>
            <Button 
              variant="outline" 
              className="mt-2"
              asChild
            >
              <a 
                href="/MENU.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FileText className="mr-2 h-4 w-4" />
                Voir la carte PDF
              </a>
            </Button>
          </div>
        </section>

        {/* Category Navigation */}
        <nav className="sticky top-20 z-40 bg-card/95 backdrop-blur-md border-b border-border py-4">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {menuCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-sm whitespace-nowrap transition-all",
                    activeCategory === cat.id
                      ? "bg-wine text-cream"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Menu Sections */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-20">
              {menuCategories.map((category) => (
                <div key={category.id} id={category.id}>
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
                  {category.id === "lounge" ? (
                    <div className="space-y-10">
                      {/* Happy Hour */}
                      <div className="p-6 bg-card border border-accent/30 rounded-lg">
                        <h4 className="font-display text-xl font-semibold text-foreground mb-6 text-center">
                          {hookahMenu.happyHour.title}
                        </h4>
                        <div className="space-y-4">
                          {hookahMenu.happyHour.items.map((item) => (
                            <div key={item.name} className="flex justify-between items-center pb-3 border-b border-border/50">
                              <span className="text-foreground font-medium">{item.name}</span>
                              <span className="text-accent font-display text-lg font-semibold">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Formule Soirée */}
                      <div className="p-6 bg-card border border-border rounded-lg">
                        <h4 className="font-display text-xl font-semibold text-foreground mb-6 text-center">
                          {hookahMenu.soiree.title}
                        </h4>
                        <div className="space-y-4">
                          {hookahMenu.soiree.items.map((item) => (
                            <div key={item.name} className="flex justify-between items-center pb-3 border-b border-border/50">
                              <span className="text-foreground font-medium">{item.name}</span>
                              <span className="text-accent font-display text-lg font-semibold">{item.price}</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-center text-accent font-semibold mt-4 pt-4 border-t border-accent/30">
                          +5€ le week-end et soirs d'événement sur les formules
                        </p>
                        <p className="text-center text-muted-foreground text-sm mt-3">
                          *Soft Premium : cocktail, thé, Red Bull, thé glacé
                        </p>
                      </div>

                      {/* Saveurs */}
                      <div className="p-6 bg-muted/50 border border-border rounded-lg text-center">
                        <p className="text-accent font-semibold mb-4">Nos Saveurs</p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {hookahMenu.saveurs.map((saveur) => (
                            <span key={saveur} className="px-3 py-1 bg-card border border-border rounded-sm text-muted-foreground text-sm">
                              {saveur}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
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
                            {item.description && (
                              <p className="text-muted-foreground text-sm mt-1">
                                {item.description}
                              </p>
                            )}
                          </div>
                          {item.price && (
                            <span className="text-accent font-display text-xl font-semibold whitespace-nowrap">
                              {item.price}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Note */}
            <div className="max-w-4xl mx-auto mt-16 text-center">
              <p className="text-muted-foreground text-sm">
                Tous nos plats sont préparés sur place avec des produits frais et de saison.
                <br />
                Merci de nous signaler toute allergie ou intolérance alimentaire.
                <br />
                Groupe à partir de 6 personnes : entrée + plat ou plat + dessert obligatoire.
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
