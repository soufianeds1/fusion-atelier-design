import { Link } from "react-router-dom";
import { Instagram, MapPin, Phone, Mail, Clock, Star } from "lucide-react";
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
              <a
                href="https://www.snapchat.com/add/morello_paris"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Snapchat"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301a.99.99 0 0 1 .417-.09c.48 0 .689.33.689.48 0 .285-.255.555-1.155.9l-.062.023c-.274.103-.609.23-.695.36-.094.14-.12.305-.12.448 0 .03.003.063.008.09.054.405.344.9.703 1.373.539.689 1.195 1.304 1.424 1.574.12.14.18.24.18.329 0 .18-.18.33-.48.45-.46.186-.9.28-1.31.28-.3 0-.45-.03-.645-.06-.12-.03-.24-.03-.39-.03-.225 0-.51.12-.78.24l-.09.045c-.493.232-.976.45-1.5.45-.165 0-.33-.015-.495-.045-.39-.075-.66-.195-.915-.315l-.054-.023c-.465-.21-.66-.3-.87-.3-.22 0-.39.06-.555.09-.255.045-.495.09-.87.09-.57 0-1.004-.195-1.44-.45l-.015-.008c-.27-.135-.555-.27-.795-.27-.15 0-.285.015-.45.06-.195.03-.315.06-.615.06-.405 0-.855-.09-1.31-.28-.299-.12-.48-.27-.48-.45 0-.09.06-.19.179-.329.23-.27.885-.885 1.424-1.574.36-.472.649-.968.704-1.373.004-.027.007-.06.007-.09 0-.143-.025-.308-.119-.448-.086-.13-.421-.257-.695-.36l-.062-.023c-.9-.345-1.155-.615-1.155-.9 0-.15.21-.48.69-.48.15 0 .3.03.416.09.374.18.733.3 1.033.3.199 0 .326-.044.401-.089-.007-.166-.018-.33-.03-.51l-.003-.06c-.104-1.628-.23-3.654.3-4.847C7.86 1.07 11.216.794 12.206.794z"/>
                </svg>
              </a>
            </div>
            
            {/* Google Review Button */}
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJw7Ktju1v5kcR06bNwDhnZvk&source=g.page.m.nr._&laa=nmx-review-solicitation-recommendation-card"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-sm transition-colors text-sm font-medium"
            >
              <Star size={16} className="fill-accent" />
              Donnez-nous votre avis
            </a>
          </div>

          {/* Horaires */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
              <Clock size={18} className="text-accent" />
              Horaires
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><span className="text-foreground font-medium">Lounge & Bar :</span> 15h00 - 2h00</p>
              <p><span className="text-foreground font-medium">Cuisine :</span> 18h00 - 1h00</p>
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