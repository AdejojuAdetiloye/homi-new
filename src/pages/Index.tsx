import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { HowItWorks } from '@/components/home/HowItWorks';
import { TrustSection } from '@/components/home/TrustSection';
import { Testimonials } from '@/components/home/Testimonials';
import { initializeMockData } from '@/utils/mockData';

const Index = () => {
  useEffect(() => {
    initializeMockData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedProperties />
        <HowItWorks />
        <TrustSection />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
