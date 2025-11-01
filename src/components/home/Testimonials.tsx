import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Chidinma Okafor',
    role: 'Software Engineer',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    rating: 5,
    text: 'HomiLink made finding my apartment in Lekki so easy! The escrow system gave me confidence that my money was safe. Moved in without any stress.',
  },
  {
    name: 'Ibrahim Mohammed',
    role: 'Business Owner',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    rating: 5,
    text: 'As a landlord, I appreciate the quality tenants HomiLink brings. The platform handles everything professionally, from applications to payments.',
  },
  {
    name: 'Blessing Adeyemi',
    role: 'Marketing Manager',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    rating: 5,
    text: "Best rental experience I've had in Nigeria! The escrow protection and verification process made me feel secure throughout. Highly recommend!",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied tenants and landlords who trust HomiLink
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Quote className="w-12 h-12 text-primary/20 mb-4" />
                
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-3 mt-auto">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full bg-primary/10"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
