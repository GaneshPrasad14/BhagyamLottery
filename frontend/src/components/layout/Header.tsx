import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language, languageNames, languageFlags, languages } from '@/i18n/translations';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/about', label: t.nav.about },
    { path: '/results', label: t.nav.results },
    { path: '/tickets', label: t.nav.tickets },
    { path: '/contact', label: t.nav.contact },
  ];




  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="Bhagyam Lottery Agency" className="h-12 md:h-16 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${location.pathname === link.path
                  ? 'text-primary bg-primary/5 font-bold'
                  : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-foreground hover:text-primary hover:bg-primary/5 gap-1">
                  <span>{languageFlags[language]}</span>
                  <span className="hidden sm:inline">{languageNames[language]}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border-border min-w-[140px]">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`cursor-pointer ${language === lang ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    <span className="mr-2">{languageFlags[lang]}</span>
                    {languageNames[lang]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground hover:text-primary hover:bg-primary/5"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${location.pathname === link.path
                    ? 'text-primary bg-primary/5'
                    : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
