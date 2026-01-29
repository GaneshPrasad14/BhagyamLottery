import { MapPin, Phone, MessageCircle, Facebook, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

const ContactPage = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/bhagyamlotteryagency2026/', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Instagram, href: 'https://www.instagram.com/bhagyamlotteryagency2026/', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Youtube, href: 'https://www.youtube.com/@bhagyamlotteryagency8084', label: 'YouTube', color: 'hover:bg-red-600' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-premium relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary-foreground mb-4 animate-fade-in">
              {t.contact.title}
            </h1>
            <p className="text-xl text-primary-foreground/80 animate-fade-in-up">
              {t.contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Address */}
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border hover:border-accent/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold shrink-0">
                    <MapPin className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                      {t.contact.address}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Thrissur Main Road, Govindapuram, Kerala
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border hover:border-accent/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold shrink-0">
                    <Phone className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                      {t.contact.phone}
                    </h3>
                    <div className="space-y-2">
                      <a
                        href="tel:9942398185"
                        className="block text-muted-foreground hover:text-accent transition-colors"
                      >
                        +91 99423 98185
                      </a>
                      <a
                        href="tel:9947698185"
                        className="block text-muted-foreground hover:text-accent transition-colors"
                      >
                        +91 99476 98185
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border hover:border-accent/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold shrink-0">
                    <WhatsAppIcon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-serif font-bold text-foreground mb-4">
                      {t.contact.whatsapp}
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="whatsapp" asChild className="gap-2">
                        <a
                          href="https://wa.me/919942398185"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <WhatsAppIcon className="w-4 h-4 text-white fill-current" />
                          99423 98185
                        </a>
                      </Button>
                      <Button variant="whatsapp" asChild className="gap-2">
                        <a
                          href="https://wa.me/919947698185"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <WhatsAppIcon className="w-4 h-4 text-white fill-current" />
                          99476 98185
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border hover:border-accent/30 transition-colors">
                <h3 className="text-lg font-serif font-bold text-foreground mb-4">
                  {t.contact.followUs}
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:text-primary-foreground ${social.color} transition-all duration-300`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden h-[400px] lg:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.755867291367!2d76.23741631531902!3d10.527835492491893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ee11d47cc94f%3A0x3ba7ee11d47cc94f!2sThrissur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bhagyam Lottery Agency Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
              {t.about.promise}
            </h2>
            <p className="text-lg text-muted-foreground italic mb-8">
              "{t.about.promiseText}"
            </p>
            <Button variant="gold" size="xl" asChild className="gap-2">
              <a href="tel:9942398185">
                <Phone className="w-5 h-5" />
                {t.tickets.callNow}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
