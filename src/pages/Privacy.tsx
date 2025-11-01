import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
            <p>We collect personal information including name, email, phone number, and property preferences to provide our services.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
            <p>Your information is used to facilitate property searches, rental applications, escrow payments, and platform communication.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal information and payment data.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Sharing of Information</h2>
            <p>We share information only with relevant parties (landlords/tenants) for transaction purposes and with payment processors for secure transactions.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
            <p>You have the right to access, update, or delete your personal information at any time through your account settings.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
