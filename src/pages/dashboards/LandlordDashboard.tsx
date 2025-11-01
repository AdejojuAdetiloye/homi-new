import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const LandlordDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Landlord Dashboard</h1>
        <p className="text-muted-foreground">Dashboard coming soon...</p>
      </main>
      <Footer />
    </div>
  );
};

export default LandlordDashboard;
