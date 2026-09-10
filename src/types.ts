export type PropertyCategory = 'House' | 'Apartment' | 'Plot';

export interface PropertyImageDetail {
  url: string;
  title: string;
  tag: string;
  description: string;
  highlight: string;
  dimensions?: string;
  materials?: string;
}

export type PropertyStatus = 'available' | 'under_offer' | 'sold';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: PropertyCategory;
  imageUrl: string;
  gallery?: string[];
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  features: string[];
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  sellerPhone?: string;
  createdAt: number;
  updatedAt?: number;
  isFeatured?: boolean;
  status?: PropertyStatus;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface ViewingBooking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyImageUrl: string;
  propertyPrice?: number;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  sellerId: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: BookingStatus;
  createdAt: number;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  phoneNumber?: string | null;
}
