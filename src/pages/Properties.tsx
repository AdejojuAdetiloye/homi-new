import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Home, Bed, Bath, Heart, Grid3x3, List, 
  SlidersHorizontal, X, ArrowRight, Filter
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Property } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import { NIGERIAN_CITIES, PROPERTY_TYPES, PROPERTY_AMENITIES } from '@/utils/constants';
import { usePropertyStore } from '@/stores/propertyStore';

const Properties = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  const { toggleSaveProperty, savedProperties } = usePropertyStore();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const allProperties: Property[] = JSON.parse(localStorage.getItem('properties') || '[]');
    setProperties(allProperties.filter(p => p.status === 'available'));
    
    // Apply filters from navigation state if any
    if (location.state?.filters) {
      const filters = location.state.filters;
      if (filters.location) setSelectedCity(filters.location);
      if (filters.propertyType) setSelectedType(filters.propertyType);
      if (filters.priceMin || filters.priceMax) {
        setPriceRange([filters.priceMin || 0, filters.priceMax || 10000000]);
      }
    }
  }, [location.state]);

  useEffect(() => {
    let filtered = [...properties];

    // Search query
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // City filter
    if (selectedCity) {
      filtered = filtered.filter(p => p.address.includes(selectedCity));
    }

    // Property type filter
    if (selectedType) {
      filtered = filtered.filter(p => p.propertyType === selectedType);
    }

    // Price range filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Bedrooms filter
    if (bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(bedrooms));
    }

    // Bathrooms filter
    if (bathrooms) {
      filtered = filtered.filter(p => p.bathrooms >= parseInt(bathrooms));
    }

    // Amenities filter
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(p =>
        selectedAmenities.every(amenity => p.amenities?.includes(amenity))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setFilteredProperties(filtered);
  }, [properties, searchQuery, selectedCity, selectedType, priceRange, bedrooms, bathrooms, selectedAmenities, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('');
    setSelectedType('');
    setPriceRange([0, 10000000]);
    setBedrooms('');
    setBathrooms('');
    setSelectedAmenities([]);
    setSortBy('newest');
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const getPropertyImage = (property: Property) => {
    if (property.images && property.images.length > 0 && property.images[0]) {
      return property.images[0];
    }
    return `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=80`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />
      
      {/* Header Section */}
      <div className="gradient-primary text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Your Dream Home
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Browse through {properties.length} verified properties across Nigeria
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-2xl">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by location, property name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
                <Button size="lg" className="gradient-primary px-8">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="w-80 flex-shrink-0 hidden lg:block"
              >
                <Card className="p-6 sticky top-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5" />
                      Filters
                    </h2>
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear All
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Location */}
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Location</label>
                      <Select value={selectedCity} onValueChange={setSelectedCity}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Cities" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Cities</SelectItem>
                          {NIGERIAN_CITIES.map((city) => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Property Type */}
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Property Type</label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Types</SelectItem>
                          {PROPERTY_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Price Range: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                      </label>
                      <Slider
                        min={0}
                        max={10000000}
                        step={100000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="my-4"
                      />
                    </div>

                    {/* Bedrooms */}
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Min Bedrooms</label>
                      <Select value={bedrooms} onValueChange={setBedrooms}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Bathrooms */}
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Min Bathrooms</label>
                      <Select value={bathrooms} onValueChange={setBathrooms}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Amenities */}
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Amenities</label>
                      <div className="flex flex-wrap gap-2">
                        {PROPERTY_AMENITIES.slice(0, 8).map((amenity) => (
                          <Badge
                            key={amenity}
                            variant={selectedAmenities.includes(amenity) ? 'default' : 'outline'}
                            className="cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => toggleAmenity(amenity)}
                          >
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Properties Grid */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredProperties.length}</span> properties found
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="hidden md:flex gap-1 bg-muted p-1 rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Properties List */}
            {filteredProperties.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <Home className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-bold mb-2">No properties found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              </Card>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-6'
              }>
                {filteredProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300">
                      <div className={viewMode === 'grid' ? '' : 'md:flex'}>
                        <div className={`relative overflow-hidden bg-muted ${viewMode === 'grid' ? 'h-64' : 'md:w-80 h-64'}`}>
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
                              className="rounded-full shadow-lg hover:scale-110 transition-transform"
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
                            <Badge className="bg-secondary text-white text-base px-4 py-1 font-semibold">
                              {formatCurrency(property.price)}/{property.priceType === 'yearly' ? 'year' : 'month'}
                            </Badge>
                          </div>
                        </div>

                        <div className="p-6 flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-bold line-clamp-1 flex-1">{property.title}</h3>
                            <Badge variant="outline" className="ml-2">
                              {PROPERTY_TYPES.find(t => t.value === property.propertyType)?.label}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center text-muted-foreground mb-4">
                            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span className="text-sm line-clamp-1">{property.address}</span>
                          </div>

                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {property.description}
                          </p>

                          <div className="flex items-center gap-4 mb-4 flex-wrap">
                            <div className="flex items-center gap-1">
                              <Bed className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-medium">{property.bedrooms} Beds</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Bath className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-medium">{property.bathrooms} Baths</span>
                            </div>
                            {property.size && (
                              <span className="text-sm text-muted-foreground font-medium">
                                {property.size} sqm
                              </span>
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
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Properties;
