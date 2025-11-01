import { create } from 'zustand';
import { Application, ApplicationStatus } from '@/types';
import { delay } from '@/utils/mockData';

interface ApplicationState {
  applications: Application[];
  loading: boolean;
  fetchApplications: (userId: string, role: 'seeker' | 'landlord') => Promise<void>;
  submitApplication: (application: Omit<Application, 'id' | 'status' | 'statusHistory' | 'createdAt'>) => Promise<void>;
  updateApplicationStatus: (id: string, status: ApplicationStatus, note?: string) => Promise<void>;
}

export const useApplicationStore = create<ApplicationState>((set) => ({
  applications: [],
  loading: false,

  fetchApplications: async (userId, role) => {
    set({ loading: true });
    await delay(300);
    const applications: Application[] = JSON.parse(localStorage.getItem('applications') || '[]');
    const filtered = role === 'seeker' 
      ? applications.filter(a => a.seekerId === userId)
      : applications.filter(a => a.landlordId === userId);
    set({ applications: filtered, loading: false });
  },

  submitApplication: async (application) => {
    await delay(500);
    const applications: Application[] = JSON.parse(localStorage.getItem('applications') || '[]');
    
    const newApplication: Application = {
      ...application,
      id: Math.random().toString(36).substring(2, 15),
      status: 'pending',
      statusHistory: [{
        status: 'pending',
        timestamp: new Date(),
      }],
      createdAt: new Date(),
    };
    
    applications.push(newApplication);
    localStorage.setItem('applications', JSON.stringify(applications));
    
    // Update property applications count
    const properties = JSON.parse(localStorage.getItem('properties') || '[]');
    const propertyIndex = properties.findIndex((p: any) => p.id === application.propertyId);
    if (propertyIndex !== -1) {
      properties[propertyIndex].applicationsCount++;
      localStorage.setItem('properties', JSON.stringify(properties));
    }
    
    set({ applications });
  },

  updateApplicationStatus: async (id, status, note) => {
    await delay(500);
    const applications: Application[] = JSON.parse(localStorage.getItem('applications') || '[]');
    const index = applications.findIndex(a => a.id === id);
    
    if (index !== -1) {
      applications[index].status = status;
      applications[index].statusHistory.push({
        status,
        timestamp: new Date(),
        note,
      });
      
      if (status !== 'pending') {
        applications[index].reviewedAt = new Date();
      }
      
      localStorage.setItem('applications', JSON.stringify(applications));
      set({ applications });
    }
  },
}));
