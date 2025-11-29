import { Link } from "react-router-dom";
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-display text-3xl font-semibold text-foreground">
                L'<span className="text-accent">Éclipse</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Un voyage culinaire hors du temps, où la cuisine italienne rencontre l'élégance parisienne.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Horaires */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
              <Clock size={18} className="text-accent" />
              Horaires
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Déjeuner</p>
                <p>Lundi - Vendredi : 12h00 - 15h00</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Dîner</p>
                <p>Lundi - Jeudi : 19h00 - 01h00</p>
                <p>Vendredi - Samedi : 19h00 - 02h00</p>
                <p>Dimanche : 19h00 - 00h00</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-foreground">Contact</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href="tel:+33123456789" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone size={16} className="text-accent" />
                +33 1 23 45 67 89
              </a>
              <a href="mailto:contact@leclipse.fr" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail size={16} className="text-accent" />
                contact@leclipse.fr
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-accent mt-0.5" />
                <span>
                  42 Rue de la Gastronomie<br />
                  75008 Paris, France
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-foreground">Navigation</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-accent transition-colors">
                Accueil
              </Link>
              <Link to="/carte" className="text-muted-foreground hover:text-accent transition-colors">
                La Carte
              </Link>
              <Link to="/histoire" className="text-muted-foreground hover:text-accent transition-colors">
                Notre Histoire
              </Link>
              <Link to="/reservation" className="text-muted-foreground hover:text-accent transition-colors">
                Réserver
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-accent transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 L'Éclipse Paris. Tous droits réservés.</p>
            <div className="flex gap-6">
              <span>Accès PMR</span>
              <span>Terrasse</span>
              <span>Climatisation</span>
              <span>Privatisation</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
