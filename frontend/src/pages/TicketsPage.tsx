import { useState, useEffect } from 'react';
import { Calendar, Phone, Ticket, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import api from '@/services/api';
import { Button } from '@/components/ui/button';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

const TicketsPage = () => {
  const { t } = useLanguage();

  // Sample upcoming tickets data
  interface TicketData {
    name: string;
    code: string;
    date: string;
    type: string;
    price: string;
    firstPrize: string;
    isFeatured: boolean;
  }

  const [tickets, setTickets] = useState<TicketData[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await api.get('/tickets');
        setTickets(data);
      } catch (error) {
        console.error('Failed to fetch tickets', error);
      }
    };

    fetchTickets();
  }, []);

  const weeklyTickets = tickets.filter(t => t.type === 'weekly');
  const bumperTickets = tickets.filter(t => t.type === 'bumper');

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-premium relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-accent blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary-foreground mb-4 animate-fade-in">
              {t.tickets.title}
            </h1>
            <p className="text-xl text-primary-foreground/80 animate-fade-in-up">
              {t.tickets.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Bumper Tickets */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              {t.tickets.bumper}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {bumperTickets.map((ticket, index) => (
              <div
                key={index}
                className="group relative bg-gradient-premium rounded-2xl p-6 md:p-8 shadow-premium border border-accent/30 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-accent blur-[60px]" />
                </div>

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-accent text-primary text-xs font-semibold mb-2">
                        {t.tickets.bumper}
                      </span>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-primary-foreground">
                        {ticket.name}
                      </h3>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold animate-float">
                      <Ticket className="w-7 h-7 text-primary" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-primary-foreground/60 text-xs uppercase tracking-wider mb-1">
                        {t.tickets.drawDate}
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span className="text-primary-foreground font-medium">{ticket.date}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-primary-foreground/60 text-xs uppercase tracking-wider mb-1">
                        First Prize
                      </p>
                      <p className="text-2xl font-bold text-accent">{ticket.firstPrize}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="hero" className="flex-1" asChild>
                      <a href="tel:9942398185" className="gap-2">
                        <Phone className="w-4 h-4" />
                        {t.tickets.callNow}
                      </a>
                    </Button>
                    <Button variant="whatsapp" className="flex-1" asChild>
                      <a
                        href="https://wa.me/919942398185"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gap-2"
                      >
                        <WhatsAppIcon className="w-4 h-4 text-white fill-current" />
                        {t.tickets.whatsapp}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Weekly Tickets */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Ticket className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              {t.tickets.weekly}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weeklyTickets.map((ticket, index) => (
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
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-gradient-gold group-hover:shadow-gold transition-all">
                    <Ticket className="w-5 h-5 text-accent group-hover:text-primary transition-colors" />
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">{t.tickets.drawDate}</span>
                    <div className="flex items-center gap-1 text-foreground text-sm font-medium">
                      <Calendar className="w-3 h-3" />
                      {ticket.date}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">First Prize</span>
                    <span className="text-accent font-bold">{ticket.firstPrize}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="gold" size="sm" className="flex-1" asChild>
                    <a href="tel:9942398185" className="gap-1">
                      <Phone className="w-3 h-3" />
                      {t.tickets.callNow}
                    </a>
                  </Button>
                  <Button variant="whatsapp" size="sm" className="flex-1" asChild>
                    <a
                      href="https://wa.me/919942398185"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-1"
                    >
                      <WhatsAppIcon className="w-3 h-3 text-white fill-current" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TicketsPage;
