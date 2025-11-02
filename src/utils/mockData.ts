import { Property, User, Application, EscrowRecord, Transaction, Message, Conversation, Complaint, Review, Notification } from '@/types';
import { NIGERIAN_CITIES, PROPERTY_AMENITIES } from './constants';

const generateId = () => Math.random().toString(36).substring(2, 15);

const nigerianNames = [
  'Chukwuemeka Okonkwo', 'Aisha Bello', 'Oluwaseun Adeyemi', 'Fatima Ibrahim',
  'Chidinma Nwankwo', 'Abdullahi Hassan', 'Ngozi Okeke', 'Musa Yusuf',
  'Chiamaka Eze', 'Ibrahim Mohammed', 'Blessing Okafor', 'Yusuf Adamu',
];

const propertyTitles = [
  'Luxury Waterfront Villa in Lekki',
  'Modern Executive Penthouse in Victoria Island',
  'Charming Colonial Home in Ikoyi',
  'Contemporary 4BR Duplex in Ajah',
  'Elegant 3BR Apartment in Lekki Phase 1',
  'Executive Mansion in Banana Island',
  'Modern 2BR Apartment in Lekki Phase 1',
  'Luxury Townhouse in Ikoyi',
  'Penthouse Suite in Victoria Island',
  'Family Home in Ajah',
  'Studio Apartment in Lekki',
  'Executive Duplex in Banana Island',
  'Garden Apartment in Ikoyi',
  'Skyline Penthouse in Victoria Island',
  'Bungalow in Lekki Phase 2',
];

const propertyDescriptions = [
  'Stunning waterfront villa with panoramic lagoon views, featuring 5 bedrooms, 6 bathrooms, private pool, and smart home automation. Includes 24/7 security, generator backup, and premium finishes throughout.',
  'Ultra-modern penthouse with floor-to-ceiling windows offering breathtaking city skyline views. Features 4 bedrooms, 5 bathrooms, private elevator, rooftop terrace, and state-of-the-art kitchen appliances.',
  'Beautifully restored colonial home with original architectural details, spacious gardens, and modern amenities. 4 bedrooms, 4 bathrooms, high ceilings, and prime location in exclusive neighborhood.',
  'Contemporary duplex design with open-plan living, premium finishes, and excellent natural light. 4 bedrooms, 4 bathrooms, private parking, and proximity to shopping centers and schools.',
  'Elegant apartment in a gated community with concierge service, fitness center, and beautiful landscaping. 3 bedrooms, 3 bathrooms, modern kitchen, and balcony with city views.',
  'Magnificent executive mansion with 6 bedrooms, 7 bathrooms, home cinema, wine cellar, and expansive gardens. Located on prestigious Banana Island with ocean views.',
  'Modern 2BR apartment in Lekki Phase 1 with open-plan living, fully equipped kitchen, and balcony overlooking the lagoon. Perfect for young professionals.',
  'Luxury townhouse with 4 bedrooms, private garden, 3-car garage, and modern finishes. Located in the heart of Ikoyi with easy access to business district.',
  'Exclusive penthouse suite with 270-degree city views, 3 bedrooms, 4 bathrooms, private rooftop pool, and 24/7 concierge service in Victoria Island.',
  'Spacious family home in Ajah with 4 bedrooms, large compound, BQ, and proximity to schools and shopping centers. Perfect for growing families.',
  'Compact studio apartment in Lekki with modern amenities, fully furnished, and excellent location close to shopping and entertainment.',
  'Executive duplex in Banana Island featuring 5 bedrooms, 6 bathrooms, home office, gym, and stunning ocean views with premium security.',
  'Beautiful garden apartment in Ikoyi with 3 bedrooms, private terrace garden, modern kitchen, and serene environment perfect for relaxation.',
  'Skyline penthouse with panoramic Victoria Island views, 4 bedrooms, 5 bathrooms, private elevator, and luxury finishes throughout.',
  'Charming bungalow in Lekki Phase 2 with 3 bedrooms, large compound, mature garden, and peaceful neighborhood setting.',
];

export const generateMockUsers = (count: number): User[] => {
  const users: User[] = [];
  const roles: Array<'landlord' | 'seeker' | 'admin'> = ['landlord', 'seeker', 'admin'];
  
  for (let i = 0; i < count; i++) {
    const role = i === 0 ? 'admin' : roles[Math.floor(Math.random() * 2)];
    const user: User = {
      id: generateId(),
      role,
      name: nigerianNames[i % nigerianNames.length],
      email: `user${i}@homilink.com`,
      phone: `+234${7 + Math.floor(Math.random() * 3)}0${Math.floor(Math.random() * 100000000)}`,
      profilePhoto: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
      verified: Math.random() > 0.2,
      rating: 3 + Math.random() * 2,
      reviewsCount: Math.floor(Math.random() * 50),
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
    };

    if (role === 'landlord') {
      user.bankDetails = {
        bankName: 'GTBank',
        accountNumber: `0${Math.floor(Math.random() * 1000000000)}`.substring(0, 10),
        accountName: user.name,
      };
    }

    users.push(user);
  }
  
  return users;
};

export const generateMockProperties = (count: number, landlordIds: string[]): Property[] => {
  const properties: Property[] = [];
  const propertyTypes: Array<'apartment' | 'house' | 'duplex' | 'studio' | 'penthouse'> = [
    'apartment', 'house', 'duplex', 'studio', 'penthouse',
  ];
  
  for (let i = 0; i < count; i++) {
    // Specific property configurations for the 15 showcase properties
    const propertyConfigs = [
      { type: 'house', bedrooms: 5, bathrooms: 6, location: 'Lekki, Lagos', price: 25000000, featured: true },
      { type: 'penthouse', bedrooms: 4, bathrooms: 5, location: 'Victoria Island, Lagos', price: 35000000, featured: true },
      { type: 'house', bedrooms: 4, bathrooms: 4, location: 'Ikoyi, Lagos', price: 18000000, featured: true },
      { type: 'duplex', bedrooms: 4, bathrooms: 4, location: 'Ajah, Lagos', price: 12000000, featured: false },
      { type: 'apartment', bedrooms: 3, bathrooms: 3, location: 'Lekki, Lagos', price: 8500000, featured: false },
      { type: 'house', bedrooms: 6, bathrooms: 7, location: 'Banana Island, Lagos', price: 45000000, featured: true },
      { type: 'apartment', bedrooms: 2, bathrooms: 2, location: 'Lekki, Lagos', price: 6500000, featured: false },
      { type: 'house', bedrooms: 4, bathrooms: 4, location: 'Ikoyi, Lagos', price: 22000000, featured: true },
      { type: 'penthouse', bedrooms: 3, bathrooms: 4, location: 'Victoria Island, Lagos', price: 28000000, featured: true },
      { type: 'house', bedrooms: 4, bathrooms: 4, location: 'Ajah, Lagos', price: 9500000, featured: false },
      { type: 'studio', bedrooms: 1, bathrooms: 1, location: 'Lekki, Lagos', price: 4500000, featured: false },
      { type: 'duplex', bedrooms: 5, bathrooms: 6, location: 'Banana Island, Lagos', price: 38000000, featured: true },
      { type: 'apartment', bedrooms: 3, bathrooms: 3, location: 'Ikoyi, Lagos', price: 15000000, featured: false },
      { type: 'penthouse', bedrooms: 4, bathrooms: 5, location: 'Victoria Island, Lagos', price: 32000000, featured: true },
      { type: 'house', bedrooms: 3, bathrooms: 3, location: 'Lekki, Lagos', price: 14000000, featured: false },
    ];

    const config = propertyConfigs[i] || propertyConfigs[0];
    const propertyType = config.type as Property['propertyType'];
    const bedrooms = config.bedrooms;
    const bathrooms = config.bathrooms;
    const location = config.location;
    
    // Coordinate mapping for Nigerian cities
    const coordinatesMap: Record<string, { lat: number; lng: number }> = {
      'Lekki, Lagos': { lat: 6.4541, lng: 3.5634 },
      'Ajah, Lagos': { lat: 6.4698, lng: 3.5852 },
      'Ikoyi, Lagos': { lat: 6.4541, lng: 3.4316 },
      'Victoria Island, Lagos': { lat: 6.4281, lng: 3.4219 },
      'Abuja': { lat: 9.0765, lng: 7.3986 },
    };
    
    const coordinates = coordinatesMap[location] || { lat: 6.5244 + (Math.random() - 0.5) * 0.5, lng: 3.3792 + (Math.random() - 0.5) * 0.5 };
    
    const amenitiesCount = 5 + Math.floor(Math.random() * 8);
    const selectedAmenities = PROPERTY_AMENITIES
      .sort(() => Math.random() - 0.5)
      .slice(0, amenitiesCount);
    
    const propertyImages = [
      // Luxury Waterfront Villa
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',

      // Modern Executive Penthouse
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop',

      // Charming Colonial Home
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154084-4e5fe7c824a0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',

      // Contemporary 4BR Duplex
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154084-4e5fe7c824a0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop',

      // Elegant 3BR Apartment
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop',
    ];

    // Assign specific images to each property based on index - using high-quality real estate images
    const propertyImageSets = [
      // Property 1: Luxury Waterfront Villa in Lekki
      [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      ],
      // Property 2: Modern Executive Penthouse in Victoria Island
      [
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop',
      ],
      // Property 3: Charming Colonial Home in Ikoyi
      [
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154084-4e5fe7c824a0?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',
      ],
      // Property 4: Contemporary 4BR Duplex in Ajah
      [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154084-4e5fe7c824a0?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop',
      ],
      // Property 5: Elegant 3BR Apartment in Lekki Phase 1
      [
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop',
      ],
      // Property 6: Executive Mansion in Banana Island
      [
        'https://images.unsplash.com/photo-1600585154084-4e5fe7c824a0?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop',
      ],
      // Property 7: Modern 2BR Apartment in Lekki Phase 1
      [
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop',
      ],
      // Property 8: Luxury Townhouse in Ikoyi
      [
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154084-4e5fe7c824a0?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',
      ],
      // Property 9: Penthouse Suite in Victoria Island
      [
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop',
      ],
      // Property 10: Family Home in Ajah
      [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154084-4e5fe7c824a0?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop',
      ],
      // Property 11: Studio Apartment in Lekki
      [
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop',
      ],
      // Property 12: Executive Duplex in Banana Island
      [
        'https://images.unsplash.com/photo-1600585154084-4e5fe7c824a0?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop',
      ],
      // Property 13: Garden Apartment in Ikoyi
      [
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154084-4e5fe7c824a0?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',
      ],
      // Property 14: Skyline Penthouse in Victoria Island
      [
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop',
      ],
      // Property 15: Bungalow in Lekki Phase 2
      [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154084-4e5fe7c824a0?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop',
      ],
    ];

    const images = propertyImageSets[i] || propertyImageSets[0];
    
    const property: Property = {
      id: generateId(),
      landlordId: landlordIds[Math.floor(Math.random() * landlordIds.length)],
      title: propertyTitles[i] || propertyTitles[0],
      description: propertyDescriptions[i] || propertyDescriptions[0],
      address: location,
      coordinates,
      price: config.price,
      priceType: 'yearly',
      propertyType,
      bedrooms,
      bathrooms,
      size: 200 + Math.floor(Math.random() * 400),
      amenities: selectedAmenities,
      images,
      status: 'available',
      featured: config.featured,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      views: 50 + Math.floor(Math.random() * 200),
      favorites: 5 + Math.floor(Math.random() * 50),
      applicationsCount: Math.floor(Math.random() * 10),
      rating: 4 + Math.random() * 1,
      reviewsCount: 5 + Math.floor(Math.random() * 20),
    };
    
    properties.push(property);
  }
  
  return properties;
};

export const initializeMockData = () => {
  // Force regeneration for development - remove this line in production
  localStorage.removeItem('homilink_initialized');

  if (localStorage.getItem('homilink_initialized')) {
    return;
  }

  const users = generateMockUsers(50);
  const landlordIds = users.filter(u => u.role === 'landlord').map(u => u.id);
  const seekerIds = users.filter(u => u.role === 'seeker').map(u => u.id);
  const properties = generateMockProperties(15, landlordIds);

  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('properties', JSON.stringify(properties));
  localStorage.setItem('applications', JSON.stringify([]));
  localStorage.setItem('escrowRecords', JSON.stringify([]));
  localStorage.setItem('transactions', JSON.stringify([]));
  localStorage.setItem('messages', JSON.stringify([]));
  localStorage.setItem('conversations', JSON.stringify([]));
  localStorage.setItem('complaints', JSON.stringify([]));
  localStorage.setItem('reviews', JSON.stringify([]));
  localStorage.setItem('notifications', JSON.stringify([]));
  localStorage.setItem('savedProperties', JSON.stringify([]));
  localStorage.setItem('homilink_initialized', 'true');
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
