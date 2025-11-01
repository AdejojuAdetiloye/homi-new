import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using HomiLink, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Use of Platform</h2>
            <p>HomiLink provides a rental marketplace platform connecting landlords and tenants with escrow payment protection.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Escrow Service</h2>
            <p>All rental payments are held in escrow until both parties confirm successful property handover. A 10% platform fee applies.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. User Responsibilities</h2>
            <p>Users must provide accurate information, verify property details, and comply with all applicable laws and regulations.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Dispute Resolution</h2>
            <p>In case of disputes, our complaint system provides a structured resolution process with admin mediation.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
