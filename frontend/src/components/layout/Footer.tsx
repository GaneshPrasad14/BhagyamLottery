import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language, languageNames, languageFlags, languages } from '@/i18n/translations';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

const Footer = () => {
  const { language, setLanguage, t } = useLanguage();




  const socialLinks = [
    { icon: WhatsAppIcon, href: 'https://wa.me/919942398185', label: 'WhatsApp' },
    { icon: Facebook, href: 'https://www.facebook.com/bhagyamlotteryagency2026/', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/bhagyamlotteryagency2026/', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@bhagyamlotteryagency8084', label: 'YouTube' },
  ];

  return (
    <footer className="bg-white text-foreground border-t border-primary/10">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Bhagyam Lottery Agency" className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {t.footer.authorized}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4 text-primary">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">{t.nav.home}</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">{t.nav.about}</Link>
              <Link to="/results" className="text-muted-foreground hover:text-primary transition-colors text-sm">{t.nav.results}</Link>
              <Link to="/tickets" className="text-muted-foreground hover:text-primary transition-colors text-sm">{t.nav.tickets}</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">{t.nav.contact}</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4 text-primary">{t.contact.title}</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-muted-foreground text-sm">
                  Thrissur Main Road, Govindapuram, Kerala
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:9942398185" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    99423 98185
                  </a>
                  <a href="tel:9947698185" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    99476 98185
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Language Switcher */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4 text-primary">Language</h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${language === lang
                    ? 'bg-primary text-white'
                    : 'bg-primary/5 text-muted-foreground hover:bg-primary/10'
                    }`}
                >
                  <span className="mr-1">{languageFlags[lang]}</span>
                  {languageNames[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-muted-foreground text-xs md:text-sm">
              {t.footer.copyright}
            </p>
            <p className="text-muted-foreground text-xs md:text-sm max-w-md">
              {t.footer.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
