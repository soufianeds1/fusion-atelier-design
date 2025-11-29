import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-hero-gradient">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-accent uppercase tracking-[0.3em] text-sm font-medium mb-4">
              Nous Contacter
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6">
              Contact
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Une question, une remarque ou une demande particulière ? 
              Nous sommes à votre écoute.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-semibold mb-6">
                    Nos Coordonnées
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-wine/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-accent" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Adresse</h3>
                        <p className="text-muted-foreground">
                          42 Rue de la Gastronomie<br />
                          75008 Paris, France
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-wine/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="text-accent" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Téléphone</h3>
                        <a
                          href="tel:+33123456789"
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          +33 1 23 45 67 89
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-wine/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="text-accent" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Email</h3>
                        <a
                          href="mailto:contact@leclipse.fr"
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          contact@leclipse.fr
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-wine/20 flex items-center justify-center flex-shrink-0">
                        <Clock className="text-accent" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Horaires</h3>
                        <div className="text-muted-foreground text-sm space-y-1">
                          <p><span className="text-foreground">Déjeuner :</span> Lun-Ven 12h-15h</p>
                          <p><span className="text-foreground">Dîner :</span> Lun-Jeu 19h-01h</p>
                          <p><span className="text-foreground">Week-end :</span> Ven-Sam 19h-02h, Dim 19h-00h</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="font-display text-xl font-semibold mb-4">
                    Suivez-nous
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-wine/20 flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-wine/30 transition-all"
                    >
                      <Instagram size={20} />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-wine/20 flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-wine/30 transition-all"
                    >
                      <Facebook size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="font-display text-2xl font-semibold mb-6">
                  Envoyez-nous un Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Nom *
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
                      Sujet *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-accent focus:outline-none transition-colors"
                      placeholder="L'objet de votre message"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-accent focus:outline-none transition-colors resize-none"
                      placeholder="Votre message..."
                    />
                  </div>

                  <Button type="submit" variant="gold" size="lg" className="w-full">
                    Envoyer
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
