import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const menuCategories = [
  {
    id: "formule",
    name: "Formule Ramadan",
    description: "Entrée · Plat ou Plat · Dessert — 49€/pers. (Lait, dattes et chorba ou harira inclus)",
    items: [],
  },
  {
    id: "entrees",
    name: "Entrées",
    description: "Au choix dans la formule",
    items: [
      { name: "Burrata Classique", description: "Burrata crémeuse, roquette, tomates cerise, crème balsamique, pesto", price: "" },
      { name: "Burrata Truffe Miel", description: "Burrata crémeuse, miel, truffe, tomate cerise, roquette, crème", price: "" },
      { name: "Carpaccio de Bœuf", description: "Émincé de bœuf tranché, roquette, pesto basilic, copeaux de parmesan, crème balsamique", price: "" },
      { name: "Foie Gras", description: "Pain toasté, tranche de foie gras, chutney de figue", price: "" },
      { name: "Salade César", description: "Laitue romaine, tomates cerise, poulet pané, croûtons, parmesan, sauce César maison", price: "" },
    ],
  },
  {
    id: "plats",
    name: "Plats",
    description: "Au choix dans la formule",
    items: [
      { name: "Filetto al Pepe Verde", description: "Filet de bœuf servi avec une sauce au poivre vert", price: "" },
      { name: "Scaloppina Milanaise", description: "Escalope de poulet panée avec roquette, copeaux de parmesan et sauce napolitaine", price: "" },
      { name: "Scaloppina ai Funghi", description: "Escalope de poulet à la crème de champignons", price: "" },
      { name: "Rigatoni Alfredo", description: "Rigatoni, poulet, champignons et une sauce crémeuse", price: "" },
      { name: "Filetto di Pesce", description: "Filet de bar cuit à la plancha avec une sauce vierge", price: "" },
      { name: "Ravioli al Tartufo", description: "Pâtes farcies à la truffe, accompagnées d'une sauce crémeuse truffée", price: "" },
    ],
  },
  {
    id: "accompagnements",
    name: "Accompagnements",
    description: "1 accompagnement au choix inclus",
    items: [
      { name: "Pâtes à la crème", description: "", price: "" },
      { name: "Riz sauce champignons", description: "", price: "" },
      { name: "Frites", description: "", price: "" },
      { name: "Légumes sautés à la plancha", description: "", price: "" },
      { name: "Pomme grenaille", description: "", price: "" },
      { name: "Purée de pommes de terre", description: "", price: "" },
    ],
  },
  {
    id: "boissons",
    name: "Boissons",
    description: "Nos boissons fraîches",
    items: [
      { name: "Coca-Cola / Cherry / Zéro", description: "Classique, Cherry ou sans sucre", price: "7€" },
      { name: "Sprite / Oasis / Ice-Tea", description: "Boissons gazeuses et thé glacé", price: "7€" },
      { name: "San-Pellegrino / Evian", description: "Eau minérale gazeuse ou plate", price: "7€" },
      { name: "Evian 1L / San-Pellegrino 1L", description: "Grande bouteille", price: "12€" },
      { name: "Red Bull", description: "Boisson énergisante", price: "7€" },
      { name: "Thé à la Menthe", description: "Thé marocain traditionnel", price: "6€" },
      { name: "Café", description: "Espresso", price: "4€" },
    ],
  },
  {
    id: "mocktails",
    name: "Mocktails",
    description: "Nos cocktails sans alcool",
    items: [
      { name: "Virgin Mojito", description: "Limonade, menthe, sucre de canne, citron vert (Fraise ou Passion +2€)", price: "10€" },
      { name: "Le Rose Bonbon", description: "Litchi, framboise, citron vert", price: "10€" },
      { name: "Le Sun Set", description: "Cranberry, ananas, orange, grenadine", price: "10€" },
      { name: "Tropical Blue", description: "Passion, ananas, curaçao", price: "10€" },
      { name: "Piña Colada", description: "Ananas, lait de coco", price: "10€" },
    ],
  },
  {
    id: "lounge",
    name: "Lounge",
    description: "Notre carte chicha",
    items: [],
  },
];

const contorni: string[] = [];

const categories = ["formule", "entrees", "plats", "accompagnements", "boissons", "mocktails", "lounge"];

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
      { name: "Hookah + Soft Premium", price: "30€" },
      { name: "Hookah Quasar + Soft", price: "35€" },
      { name: "Hookah Quasar + Soft Premium", price: "40€" },
    ],
  },
  saveurs: ["Hawai", "Love 66", "Mi Amor", "Lady Killer", "Menthe", "Pomme"],
};

const Carte = () => {
  const [activeCategory, setActiveCategory] = useState<string>("formule");

  useEffect(() => {
    // Scroll to section based on URL hash or default to antipasti
    const timer = setTimeout(() => {
      const hash = window.location.hash.replace("#", "");
      const targetId = hash && categories.includes(hash) ? hash : "formule";
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
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-accent text-lg">☪</span>
              <p className="text-accent uppercase tracking-[0.3em] text-sm font-medium">
                Spécial Ramadan
              </p>
              <span className="text-accent text-lg">☪</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-semibold mb-4">
              La Carte
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
              Formule Ramadan : Entrée · Plat ou Plat · Dessert — <span className="text-accent font-semibold">49€/pers.</span>
              <br />
              <span className="text-sm">Lait, dattes et chorba ou harira inclus</span>
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
                  {category.id === "formule" ? (
                    <div className="p-8 bg-card border border-accent/30 rounded-lg text-center shadow-[0_0_40px_hsl(43_68%_52%/0.08)]">
                      <span className="text-accent text-3xl mb-4 block">☪</span>
                      <p className="font-display text-4xl font-semibold text-accent mb-2">49€</p>
                      <p className="text-muted-foreground">par personne</p>
                      <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
                        <span className="px-3 py-1 bg-muted rounded-sm">🥛 Lait</span>
                        <span className="px-3 py-1 bg-muted rounded-sm">🌴 Dattes</span>
                        <span className="px-3 py-1 bg-muted rounded-sm">🍲 Chorba ou Harira</span>
                      </div>
                    </div>
                  ) : category.id === "lounge" ? (
                    <div className="space-y-10">
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
                          +5€ le week-end sur les formules
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
