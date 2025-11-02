import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  Phone,
  Mail,
  CheckCircle,
  Star,
  Calendar,
  Eye,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Property } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import { PROPERTY_TYPES, PROPERTY_AMENITIES } from '@/utils/constants';
import { motion, AnimatePresence } from 'framer-motion';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const properties: Property[] = JSON.parse(
      localStorage.getItem('properties') || '[]'
    );
    const foundProperty = properties.find((p) => p.id === id);
    if (foundProperty) {
      setProperty(foundProperty);
      // Check if property is saved
      const savedProperties = JSON.parse(
        localStorage.getItem('savedProperties') || '[]'
      );
      setIsSaved(savedProperties.includes(foundProperty.id));
    }
  }, [id]);

  const toggleSave = () => {
    if (!property) return;
    const savedProperties = JSON.parse(
      localStorage.getItem('savedProperties') || '[]'
    );
    let updatedSaved;

    if (isSaved) {
      updatedSaved = savedProperties.filter((id: string) => id !== property.id);
    } else {
      updatedSaved = [...savedProperties, property.id];
    }

    localStorage.setItem('savedProperties', JSON.stringify(updatedSaved));
    setIsSaved(!isSaved);
  };

  const nextImage = () => {
    if (!property?.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    if (!property?.images) return;
    setCurrentImageIndex(
      (prev) => (prev - 1 + property.images.length) % property.images.length
    );
  };

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
            <Button onClick={() => navigate('/properties')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />

      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/properties')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Button>
        </div>
      </div>

      <main className="flex-1">
        {/* Image Gallery */}
        <div className="relative h-[60vh] overflow-hidden bg-muted">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-full"
            >
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          {property.images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
                onClick={prevImage}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
                onClick={nextImage}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}

          {/* Image indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-lg bg-white/90 hover:bg-white"
              onClick={toggleSave}
            >
              <Heart
                className={`w-4 h-4 ${
                  isSaved ? 'fill-destructive text-destructive' : ''
                }`}
              />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-lg bg-white/90 hover:bg-white"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Price badge */}
          <div className="absolute bottom-6 left-6">
            <Badge className="bg-gradient-to-r from-primary to-primary-dark text-white border-0 shadow-lg text-lg px-4 py-2 font-bold">
              {formatCurrency(property.price)}/
              {property.priceType === 'yearly' ? 'year' : 'month'}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="w-5 h-5 mr-2 text-primary" />
                      <span className="text-lg">{property.address}</span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-primary/20 text-primary bg-primary/5"
                  >
                    {
                      PROPERTY_TYPES.find(
                        (t) => t.value === property.propertyType
                      )?.label
                    }
                  </Badge>
                </div>

                {/* Property stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm border">
                    <Bed className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">
                      {property.bedrooms}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Bedrooms
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm border">
                    <Bath className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">
                      {property.bathrooms}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Bathrooms
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm border">
                    <Square className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{property.size}</div>
                    <div className="text-sm text-muted-foreground">sqm</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm border">
                    <Eye className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{property.views}</div>
                    <div className="text-sm text-muted-foreground">Views</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </Card>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Reviews */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Reviews</h2>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">
                      {property.rating?.toFixed(1)}
                    </span>
                    <span className="text-muted-foreground">
                      ({property.reviewsCount} reviews)
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Reviews section coming soon...
                </p>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card className="p-6 sticky top-4">
                <h3 className="text-xl font-bold mb-4">Contact Landlord</h3>
                <div className="space-y-4">
                  <Button className="w-full gradient-primary" size="lg">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">
                    Response time
                  </div>
                  <div className="font-semibold">
                    Usually responds within 2 hours
                  </div>
                </div>
              </Card>

              {/* Property Info */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Property Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property ID</span>
                    <span className="font-medium">
                      {property.id.slice(0, 8)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Listed</span>
                    <span className="font-medium">
                      {new Date(property.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge
                      variant={
                        property.status === 'available'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {property.status}
                    </Badge>
                  </div>
                  {property.featured && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Featured</span>
                      <Badge className="bg-secondary">Yes</Badge>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
