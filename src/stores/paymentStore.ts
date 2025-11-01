import { create } from 'zustand';
import { EscrowRecord, Transaction } from '@/types';
import { delay } from '@/utils/mockData';
import { ESCROW_PLATFORM_FEE, CONFIRMATION_DEADLINE_DAYS } from '@/utils/constants';

interface PaymentState {
  transactions: Transaction[];
  escrowRecords: EscrowRecord[];
  loading: boolean;
  fetchTransactions: (userId: string) => Promise<void>;
  fetchEscrowRecords: (userId: string) => Promise<void>;
  initiatePayment: (propertyId: string, landlordId: string, amount: number) => Promise<{ success: boolean; reference?: string }>;
  confirmHandover: (escrowId: string, role: 'seeker' | 'landlord') => Promise<void>;
  renewRent: (escrowId: string) => Promise<void>;
}

const mockPaystackPayment = async (): Promise<{ success: boolean; reference: string }> => {
  await delay(2000);
  const success = Math.random() > 0.1; // 90% success rate
  return {
    success,
    reference: `HOMI-${Date.now()}-${Math.random().toString(36).substring(7)}`,
  };
};

export const usePaymentStore = create<PaymentState>((set, get) => ({
  transactions: [],
  escrowRecords: [],
  loading: false,

  fetchTransactions: async (userId) => {
    set({ loading: true });
    await delay(300);
    const transactions: Transaction[] = JSON.parse(localStorage.getItem('transactions') || '[]');
    const userTransactions = transactions.filter(t => t.userId === userId);
    set({ transactions: userTransactions, loading: false });
  },

  fetchEscrowRecords: async (userId) => {
    set({ loading: true });
    await delay(300);
    const escrowRecords: EscrowRecord[] = JSON.parse(localStorage.getItem('escrowRecords') || '[]');
    const userRecords = escrowRecords.filter(e => e.seekerId === userId || e.landlordId === userId);
    set({ escrowRecords: userRecords, loading: false });
  },

  initiatePayment: async (propertyId, landlordId, amount) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) throw new Error('Not authenticated');

    const paymentResult = await mockPaystackPayment();
    
    if (paymentResult.success) {
      const platformFee = amount * ESCROW_PLATFORM_FEE;
      const landlordAmount = amount - platformFee;
      
      const escrowRecord: EscrowRecord = {
        id: Math.random().toString(36).substring(2, 15),
        propertyId,
        seekerId: currentUser.id,
        landlordId,
        amount,
        platformFee,
        landlordAmount,
        status: 'held',
        seekerConfirmed: false,
        landlordConfirmed: false,
        confirmationDeadline: new Date(Date.now() + CONFIRMATION_DEADLINE_DAYS * 24 * 60 * 60 * 1000),
        paystackReference: paymentResult.reference,
        createdAt: new Date(),
      };
      
      const transaction: Transaction = {
        id: Math.random().toString(36).substring(2, 15),
        userId: currentUser.id,
        propertyId,
        amount,
        type: 'rent',
        status: 'completed',
        reference: paymentResult.reference,
        createdAt: new Date(),
      };
      
      const escrowRecords: EscrowRecord[] = JSON.parse(localStorage.getItem('escrowRecords') || '[]');
      const transactions: Transaction[] = JSON.parse(localStorage.getItem('transactions') || '[]');
      
      escrowRecords.push(escrowRecord);
      transactions.push(transaction);
      
      localStorage.setItem('escrowRecords', JSON.stringify(escrowRecords));
      localStorage.setItem('transactions', JSON.stringify(transactions));
      
      set({ escrowRecords, transactions });
      
      return { success: true, reference: paymentResult.reference };
    }
    
    return { success: false };
  },

  confirmHandover: async (escrowId, role) => {
    await delay(500);
    const escrowRecords: EscrowRecord[] = JSON.parse(localStorage.getItem('escrowRecords') || '[]');
    const index = escrowRecords.findIndex(e => e.id === escrowId);
    
    if (index !== -1) {
      if (role === 'seeker') {
        escrowRecords[index].seekerConfirmed = true;
      } else {
        escrowRecords[index].landlordConfirmed = true;
      }
      
      // If both confirmed, set to release_pending
      if (escrowRecords[index].seekerConfirmed && escrowRecords[index].landlordConfirmed) {
        escrowRecords[index].status = 'release_pending';
      }
      
      localStorage.setItem('escrowRecords', JSON.stringify(escrowRecords));
      set({ escrowRecords });
    }
  },

  renewRent: async (escrowId) => {
    const escrowRecords: EscrowRecord[] = JSON.parse(localStorage.getItem('escrowRecords') || '[]');
    const originalEscrow = escrowRecords.find(e => e.id === escrowId);
    
    if (!originalEscrow) throw new Error('Escrow record not found');
    
    const paymentResult = await mockPaystackPayment();
    
    if (paymentResult.success) {
      const newEscrowRecord: EscrowRecord = {
        ...originalEscrow,
        id: Math.random().toString(36).substring(2, 15),
        status: 'held',
        seekerConfirmed: false,
        landlordConfirmed: false,
        confirmationDeadline: new Date(Date.now() + CONFIRMATION_DEADLINE_DAYS * 24 * 60 * 60 * 1000),
        paystackReference: paymentResult.reference,
        createdAt: new Date(),
        renewalOf: escrowId,
      };
      
      escrowRecords.push(newEscrowRecord);
      localStorage.setItem('escrowRecords', JSON.stringify(escrowRecords));
      set({ escrowRecords });
    }
  },
}));
