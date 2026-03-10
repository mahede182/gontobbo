// ─── User ────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username?: string;
  avatar?: string;
  gender?: string;
  phone?: string;
  nationality?: string;
  address?: string;
  memberNumber?: string;
  memberClass?: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
  role?: "USER" | "ADMIN";
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/** @deprecated Use `User` with firstName + lastName instead */
export type LegacyUser = { id: string; name: string; email: string; avatar?: string };

// ─── API ─────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: PaginationMeta;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiError;
}

export interface ApiError {
  code: number;
  message: string;
  details?: unknown;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
}

// ─── Auth ────────────────────────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface GoogleAuthPayload {
  idToken: string;
}

export interface AppleAuthPayload {
  identityToken: string;
  fullName?: { firstName?: string; lastName?: string };
}

// ─── Hotels ──────────────────────────────────────────────────────────────

export interface Hotel {
  id: string;
  name: string;
  description?: string;
  location: string;
  rating: number;
  starRating: number;
  images: string[];
  isFeatured: boolean;
  checkInTime: string;
  checkOutTime: string;
}

export interface Room {
  id: string;
  name: string;
  description?: string;
  sqft?: number;
  bedType?: string;
  view?: string;
  price: number;
  maxGuests: number;
  isRefundable: boolean;
  images: string[];
  tags: string[];
}

// ─── Bookings ────────────────────────────────────────────────────────────

export type BookingType = "HOTEL" | "TRIP";
export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface Booking {
  id: string;
  type: BookingType;
  status: BookingStatus;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  totalPrice: number;
  taxAmount: number;
  createdAt: string;
}

// ─── Trips ───────────────────────────────────────────────────────────────

export interface Trip {
  id: string;
  title: string;
  destination: string;
  duration: string;
  description?: string;
  feature?: string;
  image?: string;
  peopleJoined: number;
  price: number;
  isPopular: boolean;
}

// ─── Flights ─────────────────────────────────────────────────────────────

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopLocation?: string;
  price: number;
  route: string;
}

// ─── Misc ────────────────────────────────────────────────────────────────

export interface Notification {
  id: string;
  title: string;
  body?: string;
  isRead: boolean;
  createdAt: string;
}

export interface WishlistItem {
  id: string;
  type: "HOTEL" | "FLIGHT";
  name: string;
  rating?: number;
}

export interface Offer {
  id: string;
  name: string;
  location?: string;
  image?: string;
  tier1Title?: string;
  tier1Subtitle?: string;
  tier1Value?: string;
  tier1Discount?: number;
  tier1Price?: number;
  tier2Title?: string;
  tier2Subtitle?: string;
  tier2Value?: string;
  tier2Discount?: number;
  tier2Price?: number;
}

export interface Location {
  id: string;
  name: string;
  country: string;
  image?: string;
  isPopular: boolean;
}

export interface Tag {
  id: string;
  label: string;
  icon?: string;
  active: boolean;
}
