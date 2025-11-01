import { Link } from 'react-router-dom';
import { Home, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send, Shield, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-card via-card to-primary/5 border-t mt-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-0" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Top Section - Newsletter & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 pb-12 border-b">
          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Get the latest properties, exclusive deals, and rental tips delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="gradient-secondary px-6">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </motion.div>

          {/* Trust Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4"
          >
            <div className="text-center p-4 bg-background/50 backdrop-blur rounded-xl border">
              <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-xs text-muted-foreground">Secure Escrow</div>
            </div>
            <div className="text-center p-4 bg-background/50 backdrop-blur rounded-xl border">
              <Users className="w-8 h-8 mx-auto mb-2 text-secondary" />
              <div className="text-2xl font-bold text-secondary">10K+</div>
              <div className="text-xs text-muted-foreground">Happy Users</div>
            </div>
            <div className="text-center p-4 bg-background/50 backdrop-blur rounded-xl border">
              <Award className="w-8 h-8 mx-auto mb-2 text-success" />
              <div className="text-2xl font-bold text-success">99.8%</div>
              <div className="text-xs text-muted-foreground">Satisfaction</div>
            </div>
          </motion.div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Home className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                HomiLink
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nigeria's most trusted rental marketplace with escrow protection. Find your perfect home safely and securely.
            </p>
            <div className="flex space-x-2">
              {[
                { icon: Facebook, color: 'hover:text-blue-600' },
                { icon: Twitter, color: 'hover:text-sky-500' },
                { icon: Instagram, color: 'hover:text-pink-600' },
                { icon: Linkedin, color: 'hover:text-blue-700' }
              ].map(({ icon: Icon, color }, index) => (
                <Button
                  key={index}
                  size="icon"
                  variant="ghost"
                  className={`hover:scale-110 transition-all ${color} rounded-full`}
                >
                  <Icon className="w-5 h-5" />
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/properties', label: 'Search Properties' },
                { to: '/how-it-works', label: 'How It Works' },
                { to: '/register', label: 'List Your Property' },
                { to: '/terms', label: 'Terms & Conditions' },
                { to: '/privacy', label: 'Privacy Policy' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* For Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-secondary rounded-full" />
              For Users
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/register?role=seeker', label: 'Find a Home' },
                { to: '/register?role=landlord', label: 'List Property' },
                { to: '/how-it-works', label: 'Escrow Protection' },
                { to: '/properties', label: 'Browse Properties' },
                { to: '/login', label: 'Sign In' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-secondary transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-success rounded-full" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Address</div>
                  <span className="text-sm text-muted-foreground">Victoria Island, Lagos, Nigeria</span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Phone</div>
                  <span className="text-sm text-muted-foreground">+234 800 123 4567</span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 group-hover:bg-success/20 transition-colors">
                  <Mail className="w-5 h-5 text-success" />
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Email</div>
                  <span className="text-sm text-muted-foreground">support@homilink.com</span>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-muted-foreground text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} HomiLink. All rights reserved. Built with ❤️ in Nigeria.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
              Help
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
