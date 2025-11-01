import { create } from 'zustand';
import { Property, PropertyFilters } from '@/types';
import { delay } from '@/utils/mockData';

interface PropertyState {
  properties: Property[];
  searchResults: Property[];
  filters: PropertyFilters;
  currentProperty: Property | null;
  savedProperties: string[];
  loading: boolean;
  fetchProperties: () => Promise<void>;
  searchProperties: (filters: PropertyFilters) => Promise<void>;
  getProperty: (id: string) => Promise<Property | null>;
  createProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'favorites' | 'applicationsCount'>) => Promise<void>;
  updateProperty: (id: string, data: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  toggleSaveProperty: (id: string) => void;
  setFilters: (filters: PropertyFilters) => void;
  incrementViews: (id: string) => void;
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [],
  searchResults: [],
  filters: {},
  currentProperty: null,
  savedProperties: JSON.parse(localStorage.getItem('savedProperties') || '[]'),
  loading: false,

  fetchProperties: async () => {
    set({ loading: true });
    await delay(300);
    const properties: Property[] = JSON.parse(localStorage.getItem('properties') || '[]');
    set({ properties, searchResults: properties, loading: false });
  },

  searchProperties: async (filters) => {
    set({ loading: true, filters });
    await delay(500);
    
    let properties: Property[] = JSON.parse(localStorage.getItem('properties') || '[]');
    
    // Apply filters
    if (filters.location) {
      properties = properties.filter(p => 
        p.address.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    if (filters.priceMin !== undefined) {
      properties = properties.filter(p => p.price >= filters.priceMin!);
    }
    
    if (filters.priceMax !== undefined) {
      properties = properties.filter(p => p.price <= filters.priceMax!);
    }
    
    if (filters.bedrooms) {
      properties = properties.filter(p => p.bedrooms >= filters.bedrooms!);
    }
    
    if (filters.bathrooms) {
      properties = properties.filter(p => p.bathrooms >= filters.bathrooms!);
    }
    
    if (filters.propertyType) {
      properties = properties.filter(p => p.propertyType === filters.propertyType);
    }
    
    if (filters.amenities && filters.amenities.length > 0) {
      properties = properties.filter(p =>
        filters.amenities!.every(a => p.amenities.includes(a))
      );
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          properties.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          properties.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          properties.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'popular':
          properties.sort((a, b) => b.views - a.views);
          break;
      }
    }
    
    set({ searchResults: properties, loading: false });
  },

  getProperty: async (id) => {
    await delay(300);
    const properties: Property[] = JSON.parse(localStorage.getItem('properties') || '[]');
    const property = properties.find(p => p.id === id) || null;
    set({ currentProperty: property });
    return property;
  },

  createProperty: async (property) => {
    await delay(500);
    const properties: Property[] = JSON.parse(localStorage.getItem('properties') || '[]');
    
    const newProperty: Property = {
      ...property,
      id: Math.random().toString(36).substring(2, 15),
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      favorites: 0,
      applicationsCount: 0,
    };
    
    properties.push(newProperty);
    localStorage.setItem('properties', JSON.stringify(properties));
    set({ properties });
  },

  updateProperty: async (id, data) => {
    await delay(500);
    const properties: Property[] = JSON.parse(localStorage.getItem('properties') || '[]');
    const index = properties.findIndex(p => p.id === id);
    
    if (index !== -1) {
      properties[index] = { ...properties[index], ...data, updatedAt: new Date() };
      localStorage.setItem('properties', JSON.stringify(properties));
      set({ properties });
    }
  },

  deleteProperty: async (id) => {
    await delay(500);
    const properties: Property[] = JSON.parse(localStorage.getItem('properties') || '[]');
    const filtered = properties.filter(p => p.id !== id);
    localStorage.setItem('properties', JSON.stringify(filtered));
    set({ properties: filtered });
  },

  toggleSaveProperty: (id) => {
    const saved = get().savedProperties;
    const updated = saved.includes(id)
      ? saved.filter(pid => pid !== id)
      : [...saved, id];
    
    localStorage.setItem('savedProperties', JSON.stringify(updated));
    set({ savedProperties: updated });
  },

  setFilters: (filters) => {
    set({ filters });
  },

  incrementViews: (id) => {
    const properties: Property[] = JSON.parse(localStorage.getItem('properties') || '[]');
    const index = properties.findIndex(p => p.id === id);
    
    if (index !== -1) {
      properties[index].views++;
      localStorage.setItem('properties', JSON.stringify(properties));
      set({ properties });
    }
  },
}));
