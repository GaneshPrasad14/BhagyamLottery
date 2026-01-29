import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Users, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import api from '@/services/api';
import heroBg1 from '@/assets/hero-slide-1.png';
import heroBg2 from '@/assets/hero-slide-2.jpeg';
import heroBg3 from '@/assets/hero-slide-3.jpeg';
import heroBg4 from '@/assets/hero-slide-4.jpeg';
import heroBg5 from '@/assets/hero-slide-5.jpeg';

const HomePage = () => {
  const { t } = useLanguage();
  const [upcomingTickets, setUpcomingTickets] = useState<any[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [heroBg1, heroBg2, heroBg3, heroBg4, heroBg5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await api.get('/tickets');
        // Get the first 3 tickets
        setUpcomingTickets(data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch tickets', error);
      }
    };
    fetchTickets();
  }, []);

  const trustBadges = [
    { icon: Shield, label: t.trust.govt },
    { icon: Award, label: t.trust.genuine },
    { icon: Users, label: t.trust.trusted },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Slider */}
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ backgroundImage: `url(${img})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/80" />
          </div>
        ))}

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent/40 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 text-center z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium">{t.hero.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-6 animate-fade-in-up leading-tight">
              {t.hero.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 animate-fade-in-up max-w-2xl mx-auto" style={{ animationDelay: '0.1s' }}>
              {t.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Button variant="hero" asChild>
                <Link to="/results" className="gap-2">
                  {t.hero.cta1}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" asChild>
                <Link to="/tickets">
                  {t.hero.cta2}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="group relative bg-card rounded-2xl p-8 text-center shadow-card hover:shadow-premium transition-all duration-500 border border-border hover:border-accent/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold group-hover:animate-glow">
                    <badge.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {badge.label}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.about.mission}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.about.missionText}
            </p>
            <Button variant="gold" size="lg" asChild>
              <Link to="/about" className="gap-2">
                {t.nav.about}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Tickets Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>{t.tickets.title}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
              {t.tickets.subtitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { name: 'Win Win (W-806)', code: 'WW', date: '2026-02-03', price: '₹40', prize: '₹75,00,000' },
              { name: 'Sthree Sakthi (SS-403)', code: 'SS', date: '2026-02-04', price: '₹40', prize: '₹75,00,000' },
              { name: 'Akshaya (AK-636)', code: 'AK', date: '2026-02-05', price: '₹40', prize: '₹70,00,000' }
            ].map((ticket, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl p-6 shadow-card border border-border hover:border-accent/30 hover:shadow-premium transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium mb-2">
                      {t.tickets.weekly}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-foreground">
                      {ticket.name}
                    </h3>
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-lg border-2 border-primary/10 group-hover:border-accent group-hover:scale-105 transition-all duration-300">
                    <span className="text-2xl font-black text-primary tracking-tighter">
                      {ticket.code}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">{t.tickets.drawDate}</span>
                    <span className="text-foreground font-medium">{ticket.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">First Prize</span>
                    <span className="text-accent font-bold">{ticket.prize}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full hover:bg-accent hover:text-primary transition-colors" asChild>
                  <Link to="/tickets">
                    View Details
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/tickets" className="gap-2">
                {t.results.viewAll}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-premium relative overflow-hidden" >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-primary-foreground/90 italic font-serif mb-8 leading-relaxed">
              "{t.about.promiseText}"
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/tickets" className="gap-2">
                  {t.tickets.title}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/contact">
                  {t.contact.title}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section >
    </div >
  );
};

export default HomePage;
