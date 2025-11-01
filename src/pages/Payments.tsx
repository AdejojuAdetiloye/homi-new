import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const Payments = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Payments</h1>
        <p className="text-muted-foreground">Payments page coming soon...</p>
      </main>
      <Footer />
    </div>
  );
};

export default Payments;
