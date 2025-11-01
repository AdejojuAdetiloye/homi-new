import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^(\+234|0)[789]\d{9}$/, 'Invalid Nigerian phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['landlord', 'seeker']),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const propertySchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(100),
  description: z.string().min(50, 'Description must be at least 50 characters').max(2000),
  address: z.string().min(5, 'Address is required'),
  price: z.number().positive('Price must be positive').max(1000000000, 'Price is too high'),
  priceType: z.enum(['monthly', 'yearly']),
  propertyType: z.enum(['apartment', 'house', 'duplex', 'studio', 'penthouse']),
  bedrooms: z.number().int().min(1).max(20),
  bathrooms: z.number().int().min(1).max(20),
  size: z.number().positive().optional(),
  amenities: z.array(z.string()).min(1, 'Select at least one amenity'),
  images: z.array(z.string()).min(3, 'Upload at least 3 images').max(20),
});

export const applicationSchema = z.object({
  employmentStatus: z.string().min(1, 'Employment status is required'),
  employerName: z.string().min(2, 'Employer name is required'),
  monthlyIncome: z.number().positive('Monthly income must be positive'),
  moveInDate: z.date(),
  message: z.string().min(20, 'Message must be at least 20 characters').max(500),
});

export const complaintSchema = z.object({
  category: z.enum(['payment_issue', 'property_condition', 'breach_of_agreement', 'harassment', 'fraud', 'other']),
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  description: z.string().min(20, 'Description must be at least 20 characters').max(1000),
});

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().max(100).optional(),
  comment: z.string().min(50, 'Comment must be at least 50 characters').max(500),
  anonymous: z.boolean().default(false),
});

export const bankDetailsSchema = z.object({
  bankName: z.string().min(1, 'Bank name is required'),
  accountNumber: z.string().regex(/^\d{10}$/, 'Account number must be 10 digits'),
  accountName: z.string().min(2, 'Account name is required'),
});
