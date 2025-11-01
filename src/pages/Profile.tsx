import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Profile</h1>
        <p className="text-muted-foreground">Profile page coming soon...</p>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
