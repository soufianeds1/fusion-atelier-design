import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Instagram, Star } from "lucide-react";
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
                          20 Rue Clapeyron<br />
                          75008 Paris
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
                          href="tel:0753236352"
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          07 53 23 63 52
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
                          href="mailto:contact@morello-paris.fr"
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          contact@morello-paris.fr
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
                          <p>Lounge & Bar : 15h00 - 2h00</p>
                          <p>Cuisine : 18h00 - 1h00</p>
                          <p className="text-foreground font-medium mt-2">Ouvert 7j/7</p>
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
                      href="https://www.instagram.com/morello_paris?igsh=MmlwdmU2dHM2bzVm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-wine/20 flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-wine/30 transition-all"
                    >
                      <Instagram size={20} />
                    </a>
                    <a
                      href="https://www.tiktok.com/@morello_paris"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-wine/20 flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-wine/30 transition-all"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.snapchat.com/add/morello_paris"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-wine/20 flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-wine/30 transition-all"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301a.99.99 0 0 1 .417-.09c.48 0 .689.33.689.48 0 .285-.255.555-1.155.9l-.062.023c-.274.103-.609.23-.695.36-.094.14-.12.305-.12.448 0 .03.003.063.008.09.054.405.344.9.703 1.373.539.689 1.195 1.304 1.424 1.574.12.14.18.24.18.329 0 .18-.18.33-.48.45-.46.186-.9.28-1.31.28-.3 0-.45-.03-.645-.06-.12-.03-.24-.03-.39-.03-.225 0-.51.12-.78.24l-.09.045c-.493.232-.976.45-1.5.45-.165 0-.33-.015-.495-.045-.39-.075-.66-.195-.915-.315l-.054-.023c-.465-.21-.66-.3-.87-.3-.22 0-.39.06-.555.09-.255.045-.495.09-.87.09-.57 0-1.004-.195-1.44-.45l-.015-.008c-.27-.135-.555-.27-.795-.27-.15 0-.285.015-.45.06-.195.03-.315.06-.615.06-.405 0-.855-.09-1.31-.28-.299-.12-.48-.27-.48-.45 0-.09.06-.19.179-.329.23-.27.885-.885 1.424-1.574.36-.472.649-.968.704-1.373.004-.027.007-.06.007-.09 0-.143-.025-.308-.119-.448-.086-.13-.421-.257-.695-.36l-.062-.023c-.9-.345-1.155-.615-1.155-.9 0-.15.21-.48.69-.48.15 0 .3.03.416.09.374.18.733.3 1.033.3.199 0 .326-.044.401-.089-.007-.166-.018-.33-.03-.51l-.003-.06c-.104-1.628-.23-3.654.3-4.847C7.86 1.07 11.216.794 12.206.794z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Google Review */}
                <div>
                  <h3 className="font-display text-xl font-semibold mb-4">
                    Votre Avis Compte
                  </h3>
                  <a
                    href="https://search.google.com/local/writereview?placeid=ChIJw7Ktju1v5kcR06bNwDhnZvk&source=g.page.m.nr._&laa=nmx-review-solicitation-recommendation-card"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-accent/10 hover:bg-accent/20 text-accent rounded-sm transition-colors font-medium"
                  >
                    <Star size={18} className="fill-accent" />
                    Laisser un avis Google
                  </a>
                  <p className="text-muted-foreground text-sm mt-2">
                    Partagez votre expérience avec nous ⭐
                  </p>
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