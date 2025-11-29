import { Link } from "react-router-dom";
import { Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={logo} alt="LE MORELLO" className="h-14 w-auto" />
              <span className="font-display text-2xl font-semibold tracking-wide text-foreground">LE MORELLO</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Un voyage culinaire hors du temps, où la cuisine italienne rencontre l'élégance parisienne.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.instagram.com/morello_paris?igsh=MmlwdmU2dHM2bzVm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@morello_paris"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="TikTok"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Horaires */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
              <Clock size={18} className="text-accent" />
              Horaires
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Ouverture : 15h00</p>
              <p>Cuisine : jusqu'à 1h00</p>
              <p>Lounge : jusqu'à 2h00</p>
              <p className="text-xs text-muted-foreground/70 mt-2">Tous les jours</p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-foreground">Contact</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href="tel:0753236352" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone size={16} className="text-accent" />
                07 53 23 63 52
              </a>
              <a href="mailto:contact@morello-paris.fr" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail size={16} className="text-accent" />
                contact@morello-paris.fr
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-accent mt-0.5" />
                <span>
                  20 Rue Clapeyron<br />
                  75008 Paris
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
            <p>© 2024 LE MORELLO. Tous droits réservés.</p>
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