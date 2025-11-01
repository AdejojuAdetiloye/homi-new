import { Property, User, Application, EscrowRecord, Transaction, Message, Conversation, Complaint, Review, Notification } from '@/types';
import { NIGERIAN_CITIES, PROPERTY_AMENITIES } from './constants';

const generateId = () => Math.random().toString(36).substring(2, 15);

const nigerianNames = [
  'Chukwuemeka Okonkwo', 'Aisha Bello', 'Oluwaseun Adeyemi', 'Fatima Ibrahim',
  'Chidinma Nwankwo', 'Abdullahi Hassan', 'Ngozi Okeke', 'Musa Yusuf',
  'Chiamaka Eze', 'Ibrahim Mohammed', 'Blessing Okafor', 'Yusuf Adamu',
];

const propertyTitles = [
  'Luxury 3 Bedroom Apartment',
  'Modern 2 Bedroom Flat',
  'Spacious 4 Bedroom Duplex',
  'Executive Studio Apartment',
  'Premium 5 Bedroom Penthouse',
  'Elegant 3 Bedroom Terraced House',
  'Contemporary 2 Bedroom Serviced Apartment',
];

const propertyDescriptions = [
  'Beautiful and spacious property in a serene environment with 24/7 security, generator, and all modern amenities. Perfect for families and professionals.',
  'Newly renovated apartment with modern fittings, ample parking space, and excellent security. Located in a premium neighborhood with easy access to major roads.',
  'Luxury property with breathtaking views, fitted kitchen, swimming pool, and gym. Ideal for those seeking comfort and elegance in a prime location.',
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
    const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const bedrooms = propertyType === 'studio' ? 1 : 1 + Math.floor(Math.random() * 5);
    const bathrooms = Math.ceil(bedrooms * 0.75);
    const location = NIGERIAN_CITIES[Math.floor(Math.random() * NIGERIAN_CITIES.length)];
    
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
    
    const imageCount = 5 + Math.floor(Math.random() * 5);
    const images = Array.from({ length: imageCount }, (_, idx) => 
      `https://images.unsplash.com/photo-${1600000000000 + idx * 100000}?w=800&h=600&fit=crop`
    );
    
    const property: Property = {
      id: generateId(),
      landlordId: landlordIds[Math.floor(Math.random() * landlordIds.length)],
      title: `${propertyTitles[Math.floor(Math.random() * propertyTitles.length)]} in ${location}`,
      description: propertyDescriptions[Math.floor(Math.random() * propertyDescriptions.length)],
      address: location,
      coordinates,
      price: (500000 + Math.floor(Math.random() * 5000000)) * 100,
      priceType: Math.random() > 0.3 ? 'yearly' : 'monthly',
      propertyType,
      bedrooms,
      bathrooms,
      size: 50 + Math.floor(Math.random() * 300),
      amenities: selectedAmenities,
      images,
      status: Math.random() > 0.2 ? 'available' : 'rented',
      featured: Math.random() > 0.8,
      createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      views: Math.floor(Math.random() * 1000),
      favorites: Math.floor(Math.random() * 100),
      applicationsCount: Math.floor(Math.random() * 20),
      rating: 3 + Math.random() * 2,
      reviewsCount: Math.floor(Math.random() * 30),
    };
    
    properties.push(property);
  }
  
  return properties;
};

export const initializeMockData = () => {
  if (localStorage.getItem('homilink_initialized')) {
    return;
  }

  const users = generateMockUsers(50);
  const landlordIds = users.filter(u => u.role === 'landlord').map(u => u.id);
  const seekerIds = users.filter(u => u.role === 'seeker').map(u => u.id);
  const properties = generateMockProperties(100, landlordIds);

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
