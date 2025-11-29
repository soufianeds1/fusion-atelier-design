import { Sparkles, Clock, Utensils } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Cadre Unique",
    description:
      "Lustres majestueux, miroirs dorés et lumière tamisée créent une atmosphère envoûtante où chaque instant devient précieux.",
  },
  {
    icon: Utensils,
    title: "Cuisine Fusion",
    description:
      "Notre chef marie les techniques françaises aux saveurs d'Asie pour créer des plats signatures qui éveillent tous vos sens.",
  },
  {
    icon: Clock,
    title: "Ouvert Tard",
    description:
      "Prolongez vos soirées jusqu'à 2h du matin dans notre écrin de raffinement, idéal pour vos fins de soirée mémorables.",
  },
];

export function AboutSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-wine/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-accent uppercase tracking-[0.3em] text-sm font-medium mb-4">
            À Propos
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
            L'Art de Recevoir
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Sous les lustres de cristal et les reflets des miroirs d'époque, 
            L'Éclipse vous invite à une parenthèse enchantée. Nos tons bordeaux 
            et bleu nuit créent une ambiance à la fois chic et intimiste, 
            où chaque dîner devient une célébration.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card border border-border rounded-lg p-8 text-center hover:border-accent/30 transition-all duration-500 hover:shadow-[0_0_40px_hsl(0_45%_30%/0.1)]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wine/20 text-accent mb-6 group-hover:bg-wine/30 transition-colors">
                <feature.icon size={28} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
