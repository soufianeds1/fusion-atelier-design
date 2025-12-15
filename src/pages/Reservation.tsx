import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, Users, Phone, Mail, AlertTriangle } from "lucide-react";
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

  // Max convives selon le jour (12 max le week-end)
  const maxGuests = isWeekend ? 12 : 18;

  // Caution requise à partir de 6 personnes
  const requiresDeposit = parseInt(formData.guests) >= 6;

  const [isLoading, setIsLoading] = useState(false);
  const [depositPaid, setDepositPaid] = useState(false);

  // Reset deposit confirmation when guests change below 6
  const handleGuestsChange = (value: string) => {
    if (parseInt(value) < 6) {
      setDepositPaid(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Format the date for display
    const dateObj = new Date(formData.date);
    const formattedDate = dateObj.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    // Get service label
    const serviceLabel = SERVICES.find(s => s.value === formData.service)?.label || formData.service;

    // Send data to Google Sheet
    const googleSheetUrl = "https://script.google.com/macros/s/AKfycbxj3UaWFOpqo7dOsWwYvunDAecLTLE37A-4zXem53A4N_uDdwnsWnJ_iTmDjRrL8jIV/exec";
    
    try {
      await fetch(googleSheetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formattedDate,
          service: serviceLabel,
          guests: formData.guests,
          message: formData.message,
          deposit: requiresDeposit ? `${parseInt(formData.guests) * 10}€` : "Non requis",
          depositConfirmed: requiresDeposit ? (depositPaid ? "Oui - Confirmé par le client" : "Non") : "N/A",
          timestamp: new Date().toISOString(),
        }),
      });

      toast({
        title: "Réservation envoyée",
        description: "Votre demande a été enregistrée. Nous vous contacterons bientôt.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        service: "",
        guests: "2",
        message: "",
      });
    } catch (error) {
      console.error("Erreur envoi Google Sheet:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
      // Reset deposit confirmation when changing guests
      if (name === "guests") {
        handleGuestsChange(value);
      }
      return newData;
    });
  };

  // Check if form can be submitted
  const canSubmit = !requiresDeposit || depositPaid;

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

                  {requiresDeposit && (
                    <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-sm space-y-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-destructive text-sm font-semibold">
                            Paiement obligatoire avant réservation
                          </p>
                          <p className="text-foreground text-sm mt-1">
                            Pour les groupes de 6 personnes ou plus, une caution de 10€ par personne est <strong>obligatoire</strong>. Sans paiement, la réservation ne pourra pas être validée.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-background/50 p-3 rounded-sm">
                        <p className="text-foreground text-sm font-medium">
                          Montant à payer : <span className="text-lg font-bold text-accent">{parseInt(formData.guests) * 10}€</span>
                        </p>
                        <p className="text-muted-foreground text-xs mt-1">
                          Non remboursable en cas d'annulation ou de no-show
                        </p>
                      </div>

                      <a
                        href={`https://www.paypal.com/paypalme/LEMORELLO/${parseInt(formData.guests) * 10}EUR`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-[#0070ba] hover:bg-[#005ea6] text-white font-medium rounded-sm transition-colors"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.771.771 0 0 1 .761-.654h6.393c2.115 0 3.596.55 4.403 1.635.753 1.013.89 2.333.407 3.924-.016.054-.033.107-.05.162l-.002.006v.001c-.598 2.282-1.77 3.796-3.484 4.504-.86.355-1.865.535-2.99.535H8.007a.77.77 0 0 0-.76.654l-.82 5.226a.77.77 0 0 1-.76.654h-.591a.642.642 0 0 0-.633.74l-.367 2.33z"/>
                          <path d="M19.904 8.96c-.027.113-.057.227-.089.343-.923 3.324-3.067 4.477-6.103 4.477h-.684a.773.773 0 0 0-.76.654l-.788 5.022-.224 1.42a.405.405 0 0 0 .4.466h2.807c.332 0 .614-.241.666-.568l.027-.14.529-3.358.034-.184a.67.67 0 0 1 .66-.568h.42c2.692 0 4.8-1.094 5.417-4.257.257-1.32.124-2.424-.557-3.2a2.66 2.66 0 0 0-.755-.607z"/>
                        </svg>
                        Étape 1 : Payer {parseInt(formData.guests) * 10}€ via PayPal
                      </a>

                      <div className="flex items-start gap-3 pt-2 border-t border-border">
                        <Checkbox
                          id="depositPaid"
                          checked={depositPaid}
                          onCheckedChange={(checked) => setDepositPaid(checked === true)}
                          className="mt-0.5"
                        />
                        <label
                          htmlFor="depositPaid"
                          className="text-sm cursor-pointer select-none"
                        >
                          <span className="font-medium">Étape 2 :</span> Je confirme avoir effectué le paiement de {parseInt(formData.guests) * 10}€ via PayPal
                        </label>
                      </div>

                      {!depositPaid && (
                        <p className="text-destructive text-xs font-medium">
                          ⚠️ Vous devez payer et confirmer le paiement pour pouvoir envoyer votre réservation
                        </p>
                      )}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    variant="gold" 
                    size="lg" 
                    className="w-full" 
                    disabled={isLoading || !canSubmit}
                  >
                    {isLoading ? "Envoi en cours..." : requiresDeposit && !depositPaid ? "Paiement requis avant réservation" : "Envoyer ma Demande"}
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
                      <p className="text-sm mt-1 text-accent">À partir de 6 pers. : caution 10€/pers.</p>
                      <p className="text-xs mt-1 text-muted-foreground/70">Non remboursable en cas d'annulation</p>
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
                        jusqu'à 18 personnes. Contactez-nous pour un devis personnalisé.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-foreground font-medium mb-2">Modes de Paiement</h3>
                      <p>Espèces • PayPal</p>
                      <p className="text-sm mt-1 text-muted-foreground/70">Caution via PayPal uniquement</p>
                    </div>
                    <div>
                      <h3 className="text-foreground font-medium mb-2">Services</h3>
                      <p>Climatisation • Wifi gratuit</p>
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