import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Phone, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SERVICES = [
  { value: "19h-21h", label: "1er service (19h - 21h)" },
  { value: "21h-23h", label: "2ème service (21h - 23h)" },
  { value: "23h-01h", label: "3ème service (23h - 01h)" },
];

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    service: "",
    guests: "2",
    message: "",
  });

  // Déterminer si c'est un week-end
  const isWeekend = useMemo(() => {
    if (!formData.date) return false;
    const date = new Date(formData.date);
    const day = date.getDay();
    return day === 0 || day === 5 || day === 6; // Vendredi, Samedi, Dimanche
  }, [formData.date]);

  // Max convives selon le jour
  const maxGuests = isWeekend ? 12 : 18;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande envoyée !",
      description: "Nous vous confirmerons votre réservation par email sous 24h.",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      // Réajuster le nombre de convives si nécessaire
      if (name === "date") {
        const date = new Date(value);
        const day = date.getDay();
        const weekend = day === 0 || day === 5 || day === 6;
        const max = weekend ? 12 : 18;
        if (parseInt(prev.guests) > max) {
          newData.guests = max.toString();
        }
      }
      return newData;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-hero-gradient">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-accent uppercase tracking-[0.3em] text-sm font-medium mb-4">
              Réservation
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6">
              Réserver une Table
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Assurez-vous une place dans notre écrin pour une soirée inoubliable.
            </p>
          </div>
        </section>

        {/* Reservation Form */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* Form */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="font-display text-2xl font-semibold mb-6">
                  Formulaire de Réservation
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-accent focus:outline-none transition-colors"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-accent focus:outline-none transition-colors"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-accent focus:outline-none transition-colors"
                      placeholder="06 12 34 56 78"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        <Calendar size={16} className="inline mr-1" />
                        Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-accent focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        <Clock size={16} className="inline mr-1" />
                        Service *
                      </label>
                      <select
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-accent focus:outline-none transition-colors"
                      >
                        <option value="">Choisir</option>
                        {SERVICES.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        <Users size={16} className="inline mr-1" />
                        Convives * {isWeekend && <span className="text-accent text-xs">(max 12 le WE)</span>}
                      </label>
                      <select
                        name="guests"
                        required
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-accent focus:outline-none transition-colors"
                      >
                        {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "personne" : "personnes"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Message (optionnel)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-accent focus:outline-none transition-colors resize-none"
                      placeholder="Allergies, occasion spéciale, demande particulière..."
                    />
                  </div>

                  <Button type="submit" variant="gold" size="lg" className="w-full">
                    Envoyer ma Demande
                  </Button>
                </form>
              </div>

              {/* Info Side */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-semibold mb-6">
                    Informations Pratiques
                  </h2>
                  <div className="space-y-6 text-muted-foreground">
                    <div>
                      <h3 className="text-foreground font-medium mb-2">Services de Réservation</h3>
                      <p>1er service : 19h - 21h</p>
                      <p>2ème service : 21h - 23h</p>
                      <p>3ème service : 23h - 01h</p>
                      <p className="text-sm mt-2 text-accent">Week-end : max 12 personnes</p>
                    </div>
                    <div>
                      <h3 className="text-foreground font-medium mb-2">Contact Direct</h3>
                      <a href="tel:0753236352" className="flex items-center gap-2 hover:text-accent transition-colors">
                        <Phone size={16} className="text-accent" />
                        07 53 23 63 52
                      </a>
                      <a href="mailto:contact@morello-paris.fr" className="flex items-center gap-2 mt-2 hover:text-accent transition-colors">
                        <Mail size={16} className="text-accent" />
                        contact@morello-paris.fr
                      </a>
                    </div>
                    <div>
                      <h3 className="text-foreground font-medium mb-2">Privatisation</h3>
                      <p>
                        Pour vos événements privés, nous pouvons accueillir 
                        jusqu'à 80 personnes. Contactez-nous pour un devis personnalisé.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-foreground font-medium mb-2">Modes de Paiement</h3>
                      <p>Carte bancaire • Espèces • Tickets Restaurant</p>
                    </div>
                    <div>
                      <h3 className="text-foreground font-medium mb-2">Services</h3>
                      <p>Terrasse • Climatisation • Accès PMR • Wifi gratuit</p>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    20 Rue Clapeyron<br />
                    75008 Paris
                  </p>
                  <Button variant="outline" asChild>
                    <a
                      href="https://maps.google.com/?q=20+Rue+Clapeyron+75008+Paris"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Voir sur Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Reservation;