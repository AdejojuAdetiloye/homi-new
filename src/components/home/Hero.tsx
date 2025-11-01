import { useState, useEffect } from 'react';
import { Search, MapPin, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { NIGERIAN_CITIES, PROPERTY_TYPES } from '@/utils/constants';
import { motion, AnimatePresence } from 'framer-motion';

const heroImages = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop',
];

export const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    const filters: any = {};
    if (location) filters.location = location;
    if (propertyType) filters.propertyType = propertyType;
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filters.priceMin = min;
      filters.priceMax = max;
    }
    navigate('/properties', { state: { filters } });
  };

  return (
    <div className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background Image Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center animate-ken-burns"
            style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
              Find Your Perfect Home,<br />
              <span className="text-secondary">Pay Safely</span> with Escrow Protection
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-lg">
              Connect with verified landlords. Secure payments. Guaranteed peace of mind.
            </p>

            {/* Search Bar */}
            <div className="bg-white/95 backdrop-blur p-4 md:p-6 rounded-2xl shadow-2xl mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="pl-10 text-foreground bg-background">
                      <SelectValue placeholder="Location" className="text-foreground" />
                    </SelectTrigger>
                    <SelectContent>
                      {NIGERIAN_CITIES.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="pl-10 text-foreground bg-background">
                      <SelectValue placeholder="Property Type" className="text-foreground" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-semibold text-muted-foreground z-10">₦</span>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="pl-10 text-foreground bg-background">
                      <SelectValue placeholder="Price Range" className="text-foreground" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-500000">Under ₦500k</SelectItem>
                      <SelectItem value="500000-1000000">₦500k - ₦1M</SelectItem>
                      <SelectItem value="1000000-2000000">₦1M - ₦2M</SelectItem>
                      <SelectItem value="2000000-5000000">₦2M - ₦5M</SelectItem>
                      <SelectItem value="5000000-999999999">Above ₦5M</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  size="lg"
                  onClick={handleSearch}
                  className="gradient-primary text-lg font-semibold hover:scale-105 transition-transform"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6 text-sm"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span>Escrow Protected</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span>Verified Landlords</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span>10,000+ Happy Tenants</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
};
