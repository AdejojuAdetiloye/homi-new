export type UserRole = 'landlord' | 'seeker' | 'admin';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  profilePhoto?: string;
  verified: boolean;
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  documents?: Document[];
  rating?: number;
  reviewsCount?: number;
  createdAt: Date;
}

export interface Document {
  id: string;
  type: 'id' | 'employment_letter' | 'bank_statement' | 'reference';
  url: string;
  name: string;
  uploadedAt: Date;
}

export type PropertyType = 'apartment' | 'house' | 'duplex' | 'studio' | 'penthouse';
export type PropertyStatus = 'available' | 'rented' | 'under_maintenance' | 'pending_approval';

export interface Property {
  id: string;
  landlordId: string;
  landlord?: User;
  title: string;
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  price: number;
  priceType: 'monthly' | 'yearly';
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  size?: number;
  amenities: string[];
  images: string[];
  status: PropertyStatus;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  favorites: number;
  applicationsCount: number;
  rating?: number;
  reviewsCount?: number;
}

export type ApplicationStatus = 'pending' | 'viewed' | 'accepted' | 'rejected';

export interface Application {
  id: string;
  propertyId: string;
  property?: Property;
  seekerId: string;
  seeker?: User;
  landlordId: string;
  employmentStatus: string;
  employerName: string;
  monthlyIncome: number;
  moveInDate: Date;
  message: string;
  documents: Document[];
  status: ApplicationStatus;
  statusHistory: Array<{
    status: ApplicationStatus;
    timestamp: Date;
    note?: string;
  }>;
  createdAt: Date;
  reviewedAt?: Date;
  landlordResponse?: string;
}

export type EscrowStatus = 'held' | 'release_pending' | 'released' | 'disputed' | 'refunded';

export interface EscrowRecord {
  id: string;
  propertyId: string;
  property?: Property;
  seekerId: string;
  seeker?: User;
  landlordId: string;
  landlord?: User;
  amount: number;
  platformFee: number;
  landlordAmount: number;
  status: EscrowStatus;
  seekerConfirmed: boolean;
  landlordConfirmed: boolean;
  confirmationDeadline: Date;
  paystackReference: string;
  createdAt: Date;
  releaseDate?: Date;
  renewalOf?: string;
}

export type ComplaintCategory =
  | 'payment_issue'
  | 'property_condition'
  | 'breach_of_agreement'
  | 'harassment'
  | 'fraud'
  | 'other';

export type ComplaintStatus = 'pending' | 'investigating' | 'resolved' | 'closed';
export type ComplaintPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Complaint {
  id: string;
  complainantId: string;
  complainant?: User;
  respondentId: string;
  respondent?: User;
  propertyId?: string;
  property?: Property;
  category: ComplaintCategory;
  title: string;
  description: string;
  evidence: Array<{
    id: string;
    type: 'image' | 'document';
    url: string;
    uploadedAt: Date;
  }>;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  assignedAdminId?: string;
  adminNotes?: string;
  resolution?: string;
  updates: Array<{
    id: string;
    userId: string;
    message: string;
    timestamp: Date;
    attachments?: string[];
  }>;
  createdAt: Date;
  resolvedAt?: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender?: User;
  recipientId: string;
  recipient?: User;
  content: string;
  attachments?: string[];
  read: boolean;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  participants: string[];
  participantDetails?: User[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  user?: User;
  rating: number;
  title?: string;
  comment: string;
  photos?: string[];
  anonymous: boolean;
  helpful: number;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  propertyId: string;
  amount: number;
  type: 'rent' | 'commission' | 'refund' | 'withdrawal';
  status: 'pending' | 'completed' | 'failed';
  reference: string;
  createdAt: Date;
}

export interface PropertyFilters {
  location?: string;
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: PropertyType;
  amenities?: string[];
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
}

export interface Notification {
  id: string;
  userId: string;
  type: 'application' | 'message' | 'payment' | 'complaint' | 'system';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export interface PlatformMetrics {
  totalUsers: number;
  totalLandlords: number;
  totalSeekers: number;
  activeListings: number;
  totalTransactions: number;
  escrowBalance: number;
  platformRevenue: number;
  userGrowth: Array<{ date: string; count: number }>;
  transactionVolume: Array<{ date: string; amount: number }>;
  popularLocations: Array<{ location: string; count: number }>;
}
