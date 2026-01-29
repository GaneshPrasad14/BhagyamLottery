import { CheckCircle, Target, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import shopImage from '@/assets/a.JPG';
import PageTransition from '@/components/layout/PageTransition';

const AboutPage = () => {
  const { t } = useLanguage();

  const highlights = [
    t.about.highlight1,
    t.about.highlight2,
    t.about.highlight3,
    t.about.highlight4,
    t.about.highlight5,
  ];


  return (
    <PageTransition className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-premium relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-accent blur-[80px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary-foreground mb-4 animate-fade-in">
              {t.about.title}
            </h1>
            <p className="text-xl md:text-2xl text-accent font-serif animate-fade-in-up">
              {t.about.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* About Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="prose prose-lg max-w-none order-2 lg:order-1">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {t.about.content1}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.about.content2}
                </p>
              </div>
              <div className="relative order-1 lg:order-2">
                <div className="absolute inset-0 bg-gradient-premium rounded-2xl blur-2xl opacity-20 transform rotate-6"></div>
                <img
                  src={shopImage}
                  alt="Bhagyam Lottery Agency Shop"
                  className="relative rounded-2xl shadow-2xl w-full h-auto border-4 border-white/10"
                />
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  {t.about.highlights}
                </h2>
              </div>
              <div className="grid gap-4">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-accent" />
                    </div>
                    <p className="text-foreground font-medium">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border hover:border-accent/30 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                    {t.about.mission}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {t.about.missionText}
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-card border border-border hover:border-accent/30 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                    {t.about.promise}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed italic">
                  "{t.about.promiseText}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default AboutPage;
