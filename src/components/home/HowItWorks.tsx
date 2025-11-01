import { motion } from 'framer-motion';
import { Search, Shield, Home } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Search & Find',
    description: 'Browse thousands of verified properties across Nigeria. Filter by location, price, and amenities to find your perfect match.',
  },
  {
    icon: Shield,
    title: 'Pay Safely',
    description: 'Make secure payments through our escrow system. Your money is protected until both parties confirm successful handover.',
  },
  {
    icon: Home,
    title: 'Move In Protected',
    description: 'Receive your keys and move in with confidence. Once confirmed, funds are released to the landlord.',
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to secure your dream home
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary to-secondary opacity-30" />
              )}

              <div className="relative z-10 inline-flex items-center justify-center w-32 h-32 rounded-full gradient-primary mb-6 shadow-glow">
                <step.icon className="w-16 h-16 text-white" />
              </div>

              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {index + 1}
              </div>

              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Escrow Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold text-center mb-8">Escrow Protection Flow</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="text-center p-6 bg-background rounded-xl shadow-md">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏠</span>
              </div>
              <p className="font-semibold">Tenant Applies</p>
            </div>

            <div className="flex justify-center">
              <div className="w-full h-1 bg-gradient-to-r from-primary to-secondary rounded" />
            </div>

            <div className="text-center p-6 bg-background rounded-xl shadow-md">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💳</span>
              </div>
              <p className="font-semibold">Payment to Escrow</p>
            </div>

            <div className="flex justify-center">
              <div className="w-full h-1 bg-gradient-to-r from-primary to-secondary rounded" />
            </div>

            <div className="text-center p-6 bg-background rounded-xl shadow-md">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✅</span>
              </div>
              <p className="font-semibold">Both Confirm</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-2 bg-success/10 text-success px-6 py-3 rounded-full font-semibold">
              <Shield className="w-5 h-5" />
              Funds Released Safely
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
