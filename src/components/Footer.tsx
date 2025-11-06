import { Camera } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="h-8 w-8 text-accent" />
              <span className="font-display text-2xl font-bold">Moodfotografie</span>
            </div>
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              Produktfotografie mit Emotion für Amazon & E-Commerce. 
              Efi & Moritz aus Berlin zeigen die Seele deiner Produkte.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="#services" className="hover:text-accent transition-colors">
                  Leistungen
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-accent transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="mailto:hello@moodfotografie.de" className="hover:text-accent transition-colors">
                  hello@moodfotografie.de
                </a>
              </li>
              <li>
                <a href="tel:+4930123456789" className="hover:text-accent transition-colors">
                  +49 30 123 456 789
                </a>
              </li>
              <li>Berlin, Deutschland</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Moodfotografie. Efi & Moritz. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
