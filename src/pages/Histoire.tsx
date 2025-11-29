import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import heroImage from "@/assets/hero-restaurant.jpg";

const Histoire = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="L'intérieur du restaurant L'Éclipse"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <p className="text-accent uppercase tracking-[0.3em] text-sm font-medium mb-4">
              Depuis 2019
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6">
              Notre Histoire
            </h1>
          </div>
        </section>

        {/* Story Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-12">
              <div className="space-y-6">
                <h2 className="font-display text-3xl font-semibold text-accent">
                  La Naissance d'un Rêve
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  L'Éclipse est née d'une passion commune entre deux amis : 
                  l'amour de la gastronomie française et la fascination pour les 
                  saveurs d'Asie. En 2019, au cœur de Paris, nous avons ouvert 
                  les portes d'un lieu unique où ces deux mondes se rencontrent 
                  avec harmonie.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="font-display text-3xl font-semibold text-accent">
                  Un Écrin d'Exception
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Sous nos lustres de cristal majestueux, les miroirs dorés 
                  reflètent une lumière tamisée aux tons bordeaux et bleu nuit. 
                  Chaque détail a été pensé pour créer une atmosphère 
                  enveloppante, un voyage hors du temps où chaque instant 
                  devient précieux.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Notre décor s'inspire des grandes maisons parisiennes d'antan, 
                  revisité avec une touche contemporaine. Les velours profonds, 
                  les boiseries sombres et les touches dorées créent un écrin 
                  parfait pour nos créations culinaires.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="font-display text-3xl font-semibold text-accent">
                  La Philosophie Culinaire
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Notre cuisine est un dialogue constant entre tradition et 
                  modernité. Les techniques françaises classiques rencontrent 
                  les épices et les saveurs d'Asie, créant des associations 
                  audacieuses mais toujours équilibrées. Chaque plat raconte 
                  une histoire, celle de deux cultures qui se complètent.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Nous travaillons exclusivement avec des produits frais et 
                  de saison, sélectionnés auprès de producteurs locaux passionnés. 
                  La qualité est notre obsession, du premier amuse-bouche 
                  jusqu'au dernier mignardise.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="font-display text-3xl font-semibold text-accent">
                  L'Art de Recevoir
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  À L'Éclipse, nous croyons que le service est aussi important 
                  que la cuisine. Notre équipe vous accueille avec chaleur et 
                  professionnalisme, veillant à ce que chaque moment passé 
                  chez nous soit mémorable. Que ce soit pour un dîner romantique, 
                  une célébration ou une soirée entre amis, nous sommes là 
                  pour créer des souvenirs inoubliables.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Histoire;
