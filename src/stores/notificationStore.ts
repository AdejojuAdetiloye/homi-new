import { create } from 'zustand';
import { Notification } from '@/types';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  fetchNotifications: (userId: string) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(2, 15),
      read: false,
      createdAt: new Date(),
    };
    
    const notifications = [newNotification, ...get().notifications];
    set({ notifications, unreadCount: get().unreadCount + 1 });
    
    // Store in localStorage
    const allNotifications: Notification[] = JSON.parse(localStorage.getItem('notifications') || '[]');
    allNotifications.push(newNotification);
    localStorage.setItem('notifications', JSON.stringify(allNotifications));
  },

  markAsRead: (id) => {
    const notifications = get().notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    
    const unreadCount = notifications.filter(n => !n.read).length;
    set({ notifications, unreadCount });
    
    // Update localStorage
    const allNotifications: Notification[] = JSON.parse(localStorage.getItem('notifications') || '[]');
    const index = allNotifications.findIndex(n => n.id === id);
    if (index !== -1) {
      allNotifications[index].read = true;
      localStorage.setItem('notifications', JSON.stringify(allNotifications));
    }
  },

  markAllAsRead: () => {
    const notifications = get().notifications.map(n => ({ ...n, read: true }));
    set({ notifications, unreadCount: 0 });
    
    // Update localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (currentUser) {
      const allNotifications: Notification[] = JSON.parse(localStorage.getItem('notifications') || '[]');
      const updated = allNotifications.map(n =>
        n.userId === currentUser.id ? { ...n, read: true } : n
      );
      localStorage.setItem('notifications', JSON.stringify(updated));
    }
  },

  fetchNotifications: (userId) => {
    const allNotifications: Notification[] = JSON.parse(localStorage.getItem('notifications') || '[]');
    const notifications = allNotifications.filter(n => n.userId === userId);
    const unreadCount = notifications.filter(n => !n.read).length;
    set({ notifications, unreadCount });
  },
}));
