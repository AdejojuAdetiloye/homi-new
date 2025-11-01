import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bed, Bath, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Property } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import { useNavigate } from 'react-router-dom';
import { usePropertyStore } from '@/stores/propertyStore';

export const FeaturedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const navigate = useNavigate();
  const { toggleSaveProperty, savedProperties } = usePropertyStore();

  useEffect(() => {
    const allProperties: Property[] = JSON.parse(localStorage.getItem('properties') || '[]');
    const featured = allProperties
      .filter(p => p.status === 'available')
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
    setProperties(featured);
  }, []);

  const getPropertyImage = (property: Property) => {
    if (property.images && property.images.length > 0 && property.images[0]) {
      return property.images[0];
    }
    // Fallback to a placeholder image
    return `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=80`;
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Properties</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover handpicked premium properties in prime Nigerian locations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={getPropertyImage(property)}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveProperty(property.id);
                      }}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          savedProperties.includes(property.id) ? 'fill-destructive text-destructive' : ''
                        }`}
                      />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {formatCurrency(property.price)}/{property.priceType === 'yearly' ? 'year' : 'month'}
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 line-clamp-1">{property.title}</h3>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.address}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{property.bathrooms} Baths</span>
                    </div>
                    {property.size && (
                      <span className="text-sm text-muted-foreground">{property.size} sqm</span>
                    )}
                  </div>

                  <Button
                    className="w-full group-hover:gradient-primary transition-all"
                    variant="outline"
                    onClick={() => navigate(`/properties/${property.id}`)}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="gradient-primary" onClick={() => navigate('/properties')}>
            View All Properties
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
