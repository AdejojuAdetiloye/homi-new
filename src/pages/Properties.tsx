import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Home,
  Bed,
  Bath,
  Heart,
  Grid3x3,
  List,
  SlidersHorizontal,
  X,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Property } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import {
  NIGERIAN_CITIES,
  PROPERTY_TYPES,
  PROPERTY_AMENITIES,
} from '@/utils/constants';
import { usePropertyStore } from '@/stores/propertyStore';
import { initializeMockData } from '@/utils/mockData';

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
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [bedrooms, setBedrooms] = useState('all');
  const [bathrooms, setBathrooms] = useState('all');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    // Force initialize mock data if not present
    if (!localStorage.getItem('homilink_initialized')) {
      initializeMockData();
    }

    const allProperties: Property[] = JSON.parse(
      localStorage.getItem('properties') || '[]'
    );
    setProperties(allProperties.filter((p) => p.status === 'available'));

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
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // City filter
    if (selectedCity && selectedCity !== 'all') {
      filtered = filtered.filter((p) => p.address.includes(selectedCity));
    }

    // Property type filter
    if (selectedType && selectedType !== 'all') {
      filtered = filtered.filter((p) => p.propertyType === selectedType);
    }

    // Price range filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Bedrooms filter
    if (bedrooms && bedrooms !== 'all') {
      filtered = filtered.filter((p) => p.bedrooms >= parseInt(bedrooms));
    }

    // Bathrooms filter
    if (bathrooms && bathrooms !== 'all') {
      filtered = filtered.filter((p) => p.bathrooms >= parseInt(bathrooms));
    }

    // Amenities filter
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter((p) =>
        selectedAmenities.every((amenity) => p.amenities?.includes(amenity))
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
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    setFilteredProperties(filtered);
  }, [
    properties,
    searchQuery,
    selectedCity,
    selectedType,
    priceRange,
    bedrooms,
    bathrooms,
    selectedAmenities,
    sortBy,
  ]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setSelectedType('all');
    setPriceRange([0, 10000000]);
    setBedrooms('all');
    setBathrooms('all');
    setSelectedAmenities([]);
    setSortBy('newest');
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
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
      <div className="relative h-[85vh] min-h-[600px] overflow-hidden">
        {/* Background Image Slideshow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={Math.floor(Date.now() / 8000) % 5} // Change image every 8 seconds
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center animate-ken-burns"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-${
                  1600000000000 + (Math.floor(Date.now() / 8000) % 5) * 100000
                }?w=1920&h=1080&fit=crop)`,
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Multiple Overlay Gradients for Depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20" />

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              y: [0, 15, 0],
              x: [0, -15, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className="absolute bottom-32 right-16 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              y: [0, -10, 0],
              x: [0, 8, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/15 rounded-full blur-lg"
          />
        </div>

        <div className="relative h-full flex flex-col justify-center py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-medium mb-8 border border-white/20 shadow-2xl"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Home className="w-3 h-3" />
                </motion.div>
                <span>Premium Properties Collection</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-success rounded-full"
                />
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 text-white leading-tight"
              >
                Discover Your
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="block bg-gradient-to-r from-secondary via-yellow-300 to-secondary bg-clip-text text-transparent"
                >
                  Dream Home
                </motion.span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="text-sm md:text-base text-white/90 mb-6 max-w-3xl leading-relaxed font-light"
              >
                Browse through{' '}
                <span className="font-semibold text-secondary">
                  {properties.length}
                </span>{' '}
                verified properties across Nigeria. Find the perfect home with
                our trusted escrow protection system.
              </motion.p>

              {/* Enhanced Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30 max-w-4xl mx-auto"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Search by location, property name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-12 text-base border-0 bg-white/50 focus:bg-white transition-colors placeholder:text-muted-foreground/70 rounded-xl"
                    />
                  </div>
                  <Button
                    size="lg"
                    className="gradient-primary h-12 px-8 text-base font-semibold hover:scale-105 transition-all duration-300 shadow-xl rounded-xl"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search Properties
                  </Button>
                </div>

                {/* Quick Stats with Enhanced Design */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/20"
                >
                  <div className="text-center group">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
                    >
                      <div className="text-2xl font-bold text-primary mb-1 group-hover:text-secondary transition-colors">
                        {properties.length}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">
                        Total Properties
                      </div>
                    </motion.div>
                  </div>
                  <div className="text-center group">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
                    >
                      <div className="text-2xl font-bold text-secondary mb-1 group-hover:text-primary transition-colors">
                        {
                          properties.filter((p) => p.status === 'available')
                            .length
                        }
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">
                        Available Now
                      </div>
                    </motion.div>
                  </div>
                  <div className="text-center group">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
                    >
                      <div className="text-2xl font-bold text-success mb-1 group-hover:text-secondary transition-colors">
                        {properties.filter((p) => p.featured).length}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">
                        Featured
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-white/10"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full"
            />
          </motion.div>
        </motion.div>
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
                      <label className="text-sm font-semibold mb-2 block">
                        Location
                      </label>
                      <Select
                        value={selectedCity}
                        onValueChange={setSelectedCity}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Cities" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Cities</SelectItem>
                          {NIGERIAN_CITIES.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Property Type */}
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Property Type
                      </label>
                      <Select
                        value={selectedType}
                        onValueChange={setSelectedType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
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
                        Price Range: {formatCurrency(priceRange[0])} -{' '}
                        {formatCurrency(priceRange[1])}
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
                      <label className="text-sm font-semibold mb-2 block">
                        Min Bedrooms
                      </label>
                      <Select value={bedrooms} onValueChange={setBedrooms}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any</SelectItem>
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
                      <label className="text-sm font-semibold mb-2 block">
                        Min Bathrooms
                      </label>
                      <Select value={bathrooms} onValueChange={setBathrooms}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Amenities */}
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Amenities
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {PROPERTY_AMENITIES.slice(0, 8).map((amenity) => (
                          <Badge
                            key={amenity}
                            variant={
                              selectedAmenities.includes(amenity)
                                ? 'default'
                                : 'outline'
                            }
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
                  <span className="font-semibold text-foreground">
                    {filteredProperties.length}
                  </span>{' '}
                  properties found
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
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
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
                  <h3 className="text-xl font-bold mb-2">
                    No properties found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              </Card>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-6'
                }
              >
                {filteredProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:shadow-primary/10 bg-white/95 backdrop-blur-sm">
                      <div className={viewMode === 'grid' ? '' : 'md:flex'}>
                        <div
                          className={`relative overflow-hidden bg-gradient-to-br from-muted to-muted/50 ${
                            viewMode === 'grid' ? 'h-64' : 'md:w-80 h-64'
                          }`}
                        >
                          <img
                            src={getPropertyImage(property)}
                            alt={property.title}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=80';
                            }}
                          />

                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Featured badge */}
                          {property.featured && (
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-gradient-to-r from-secondary to-secondary/80 text-white border-0 shadow-lg">
                                <span className="text-xs font-bold">
                                  FEATURED
                                </span>
                              </Badge>
                            </div>
                          )}

                          {/* Heart button */}
                          <div className="absolute top-4 right-4">
                            <Button
                              size="icon"
                              variant="secondary"
                              className="rounded-full shadow-lg hover:scale-110 transition-all duration-300 bg-white/90 hover:bg-white backdrop-blur-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSaveProperty(property.id);
                              }}
                            >
                              <Heart
                                className={`w-4 h-4 transition-colors duration-300 ${
                                  savedProperties.includes(property.id)
                                    ? 'fill-destructive text-destructive'
                                    : 'text-muted-foreground group-hover:text-destructive'
                                }`}
                              />
                            </Button>
                          </div>

                          {/* Price badge */}
                          <div className="absolute bottom-4 left-4">
                            <Badge className="bg-gradient-to-r from-primary to-primary-dark text-white border-0 shadow-lg text-base px-4 py-2 font-bold">
                              {formatCurrency(property.price)}/
                              {property.priceType === 'yearly'
                                ? 'year'
                                : 'month'}
                            </Badge>
                          </div>

                          {/* Status indicator */}
                          <div className="absolute bottom-4 right-4">
                            <div
                              className={`w-3 h-3 rounded-full shadow-lg ${
                                property.status === 'available'
                                  ? 'bg-success animate-pulse'
                                  : 'bg-muted-foreground'
                              }`}
                            />
                          </div>
                        </div>

                        <div className="p-6 flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-bold line-clamp-1 flex-1 text-foreground group-hover:text-primary transition-colors duration-300">
                              {property.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className="ml-2 border-primary/20 text-primary bg-primary/5"
                            >
                              {
                                PROPERTY_TYPES.find(
                                  (t) => t.value === property.propertyType
                                )?.label
                              }
                            </Badge>
                          </div>

                          <div className="flex items-center text-muted-foreground mb-4">
                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-primary/60" />
                            <span className="text-sm line-clamp-1 font-medium">
                              {property.address}
                            </span>
                          </div>

                          <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
                            {property.description}
                          </p>

                          {/* Property features */}
                          <div className="grid grid-cols-2 gap-3 mb-5">
                            <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-2">
                              <Bed className="w-4 h-4 text-primary" />
                              <span className="text-sm font-semibold text-foreground">
                                {property.bedrooms} Beds
                              </span>
                            </div>
                            <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-2">
                              <Bath className="w-4 h-4 text-primary" />
                              <span className="text-sm font-semibold text-foreground">
                                {property.bathrooms} Baths
                              </span>
                            </div>
                          </div>

                          {/* Amenities preview */}
                          {property.amenities &&
                            property.amenities.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-5">
                                {property.amenities
                                  .slice(0, 3)
                                  .map((amenity, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="secondary"
                                      className="text-xs bg-secondary/10 text-secondary border-secondary/20"
                                    >
                                      {amenity}
                                    </Badge>
                                  ))}
                                {property.amenities.length > 3 && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs bg-muted text-muted-foreground"
                                  >
                                    +{property.amenities.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            )}

                          <Button
                            className="w-full gradient-primary hover:shadow-lg transition-all duration-300 font-semibold group-hover:scale-[1.02]"
                            onClick={() =>
                              navigate(`/properties/${property.id}`)
                            }
                          >
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
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
