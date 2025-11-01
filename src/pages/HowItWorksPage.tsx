import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HowItWorks } from '@/components/home/HowItWorks';
import { TrustSection } from '@/components/home/TrustSection';

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">How HomiLink Works</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your complete guide to renting safely with escrow protection
            </p>
          </div>
        </div>
        <HowItWorks />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
