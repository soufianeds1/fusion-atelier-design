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
              alt="L'intérieur du restaurant LE MORELLO"
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
                  LE MORELLO est né d'une volonté audacieuse : sublimer la dolce vita 
                  dans un cadre résolument contemporain. Nous avons ouvert les portes 
                  d'un lieu hybride et singulier où l'excellence de la gastronomie 
                  italienne rencontre l'énergie vibrante d'un lounge d'exception. 
                  Plus qu'un restaurant, c'est une invitation à célébrer l'instant présent.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="font-display text-3xl font-semibold text-accent">
                  Un Écrin d'Exception
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Sous une lumière tamisée propice à la confidence comme à la fête, 
                  chaque détail a été pensé pour créer une atmosphère chic et enveloppante. 
                  L'espace a été conçu pour suspendre le temps : un refuge moderne où 
                  le confort des assises invite à la détente. C'est le décor idéal pour 
                  déguster nos créations, offrant une transition douce et élégante du 
                  dîner vers une fin de soirée inoubliable.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="font-display text-3xl font-semibold text-accent">
                  La Philosophie Culinaire
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Notre cuisine est un hommage aux grands classiques italiens, revisités 
                  avec des touches de noblesse. La tradition de la botte rencontre ici 
                  des produits de prestige : la truffe noire, le foie gras et la burrata 
                  crémeuse sont au cœur de notre signature. De notre Filetto Rossini à 
                  nos Ravioli al Tartufo, chaque assiette raconte une histoire de générosité 
                  et de raffinement, préparée avec une obsession pour le goût juste.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="font-display text-3xl font-semibold text-accent">
                  L'Art de Recevoir
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Chez LE MORELLO nous croyons que l'expérience ne s'arrête pas au repas. 
                  Notre équipe vous accueille avec chaleur pour faire de votre venue un 
                  moment privilégié. De la découverte de nos Mocktails signatures jusqu'aux 
                  instants de détente autour de nos saveurs lounge, nous sommes là pour 
                  transformer vos soirées en souvenirs mémorables, entre élégance et convivialité.
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
