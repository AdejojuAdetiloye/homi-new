import { motion } from 'framer-motion';
import { Shield, Users, TrendingUp, Award } from 'lucide-react';
import { useEffect, useState } from 'react';

const stats = [
  { icon: Shield, label: 'Secured in Escrow', value: 500000000, prefix: '₦', suffix: 'M+' },
  { icon: Users, label: 'Happy Tenants', value: 10000, prefix: '', suffix: '+' },
  { icon: TrendingUp, label: 'Properties Listed', value: 5000, prefix: '', suffix: '+' },
  { icon: Award, label: 'Satisfaction Rate', value: 99.8, prefix: '', suffix: '%' },
];

const AnimatedCounter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

export const TrustSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Money is Protected</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our escrow system ensures your payment is only released after both you and the landlord confirm successful handover. Peace of mind guaranteed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {stat.prefix}
                  <AnimatedCounter end={stat.value} />
                  {stat.suffix}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Verified Landlords',
              description: 'All landlords go through our verification process including identity and property ownership checks.',
            },
            {
              title: 'Secure Payments',
              description: 'Powered by Paystack with bank-level encryption. Your financial information is always protected.',
            },
            {
              title: '24/7 Support',
              description: 'Our support team is always available to help resolve any issues or answer your questions.',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center p-6"
            >
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
