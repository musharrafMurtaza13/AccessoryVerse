export type ListingStatus = 'Active' | 'Processing' | 'Sold';

export interface Listing {
  id: number | string;
  title: string;
  city: string;
  price: number;
  description: string;
  posted: string;
  status: ListingStatus;
  imageUrl: string;
}

/** What the "Add New Listing" form collects. */
export interface NewListing {
  title: string;
  city: string;
  price: string;
  description: string;
  status: ListingStatus;
}

export interface User {
  name: string;
  email: string;
}

export interface SignInPayload {
  email: string;
  password: string;
  remember: boolean;
}

export interface SignUpPayload extends SignInPayload {
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export type AuthMode = 'signin' | 'signup';
export type Page = 'Home' | 'Listings' | 'About Us' | 'Features' | 'Newsletter';