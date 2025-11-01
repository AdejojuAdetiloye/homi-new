import { create } from 'zustand';
import { User } from '@/types';
import { delay } from '@/utils/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  verifyEmail: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: JSON.parse(localStorage.getItem('currentUser') || 'null'),
  isAuthenticated: !!localStorage.getItem('currentUser'),

  login: async (email: string, password: string) => {
    await delay(500);
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  register: async (data) => {
    await delay(500);
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(u => u.email === data.email)) {
      throw new Error('Email already exists');
    }
    
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 15),
      role: data.role as 'landlord' | 'seeker',
      name: data.name!,
      email: data.email!,
      phone: data.phone!,
      profilePhoto: data.profilePhoto,
      verified: false,
      createdAt: new Date(),
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    set({ user: newUser, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('currentUser');
    set({ user: null, isAuthenticated: false });
  },

  updateProfile: async (data) => {
    await delay(500);
    const currentUser = get().user;
    if (!currentUser) throw new Error('Not authenticated');
    
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex(u => u.id === currentUser.id);
    
    if (index !== -1) {
      users[index] = { ...users[index], ...data };
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(users[index]));
      set({ user: users[index] });
    }
  },

  verifyEmail: async () => {
    await delay(1000);
    const currentUser = get().user;
    if (!currentUser) throw new Error('Not authenticated');
    
    await get().updateProfile({ verified: true });
  },
}));
