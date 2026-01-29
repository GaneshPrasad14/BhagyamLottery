import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ResultsTable, { LotteryResult } from '@/components/results/ResultsTable';
import api from '@/services/api';
import PageTransition from '@/components/layout/PageTransition';

const ResultsPage = () => {
  const { t } = useLanguage();

  // Mock data matching the table structure
  // In a real app, this would come from an API
  const [results, setResults] = useState<LotteryResult[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await api.get('/results');
        // Transform API data to match component structure if needed, or ensure API returns correct structure
        // Assuming API returns { _id, name, code, date, link... }
        // Mapping _id to id for the table component
        const formattedResults = data.map((item: any) => ({
          id: item._id,
          name: item.name,
          code: item.code,
          drawDate: item.date,
          link: item.link ? `http://localhost:5000${item.link}` : '#'
        }));
        setResults(formattedResults);
      } catch (error) {
        console.error('Failed to fetch results', error);
      }
    };

    fetchResults();
  }, []);

  return (
    <PageTransition className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-premium relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary-foreground mb-4 animate-fade-in">
              {t.results.title}
            </h1>
            <p className="text-xl text-primary-foreground/80 animate-fade-in-up">
              {t.results.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Results Table Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
            <ResultsTable data={results} />
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ResultsPage;


