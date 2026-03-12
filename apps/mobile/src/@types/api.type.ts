// ─── Shared Base Types ────────────────────────────────────────────────────────
export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type PaginatedResponse<T> = {
  success: boolean;
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
};

// ─── Bookings ───────────────────────────────────────────────────────────────
export type Booking = {
  id: string;
  userId: string;
  hotelId: string | null;
  roomId: string | null;
  tripId: string | null;
  type: "HOTEL" | "TRIP";
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  totalPrice: number;
  discountAmount: number;
  taxAmount: number;
  flightFee: number;
  bookingFor: "MYSELF" | "SOMEONE_ELSE";
  guestTitle: string | null;
  guestFirstName: string | null;
  guestLastName: string | null;
  guestEmail: string | null;
  guestPhone: string | null;
  guestAddress: string | null;
  guestState: string | null;
  createdAt: string;
  updatedAt: string;
  hotel: {
    name: string;
    location: string;
    images: string[];
    rating: number;
  } | null;
  room: { name: string; price: number } | null;
  trip: { title: string; destination: string; image: string } | null;
};

export type CreateBookingParams = {
  type: "HOTEL" | "TRIP";
  hotelId?: string;
  roomId?: string;
  tripId?: string;
  checkIn: string;
  checkOut: string;
  adults?: number;
  children?: number;
  rooms?: number;
  bookingFor?: "MYSELF" | "SOMEONE_ELSE";
  guestTitle?: string;
  guestFirstName?: string;
  guestLastName?: string;
  guestEmail?: string;
  guestPhone?: string;
  guestAddress?: string;
  guestState?: string;
  travellers?: {
    fullName: string;
    dateOfBirth?: string;
    gender?: string;
    nationality?: string;
    passportNumber?: string;
    passportCountry?: string;
    travellerType?: string;
  }[];
};

// ─── Flights ────────────────────────────────────────────────────────────────
export type Flight = {
  id: string;
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopLocation: string | null;
  price: number;
  services: string[];
  route: string;
  createdAt: string;
  updatedAt: string;
};

export type FlightSearchParams = {
  departure?: string;
  arrival?: string;
  date?: string;
  passengers?: number;
  maxStops?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "duration" | "departure";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

// ─── Hotels ─────────────────────────────────────────────────────────────────
export type Hotel = {
  id: string;
  name: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  rating: number;
  starRating: number;
  images: string[];
  checkInTime: string;
  checkOutTime: string;
  isFeatured: boolean;
  isActive: boolean;
  startingPrice: number | null;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};

export type HotelDetail = Hotel & {
  amenities: Amenity[];
  rooms: Room[];
  reviews: HotelReview[];
};

export type Room = {
  id: string;
  hotelId: string;
  name: string;
  description: string;
  sqft: number;
  bedType: string;
  view: string;
  price: number;
  taxInfo: string;
  maxGuests: number;
  isRefundable: boolean;
  isAvailable: boolean;
  images: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type Amenity = {
  id: string;
  hotelId: string;
  name: string;
  icon: string;
};

export type HotelReview = {
  id: string;
  hotelId: string;
  userId: string;
  rating: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: { firstName: string; lastName: string; avatar: string | null };
};

export type HotelGallery = {
  hotelImages: string[];
  roomImages: { roomName: string; images: string[] }[];
};

export type SearchParams = {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
  minPrice?: number;
  maxPrice?: number;
  starRating?: number;
  sortBy?: "name" | "price" | "rating" | "starRating";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

// ─── Locations ──────────────────────────────────────────────────────────────
export type Location = {
  id: string;
  name: string;
  country: string;
  image: string | null;
  isPopular: boolean;
  latitude: number | null;
  longitude: number | null;
};

// ─── Notifications ──────────────────────────────────────────────────────────
export type Notification = {
  id: string;
  userId: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
};

export type NotificationsResponse = {
  success: boolean;
  data: { notifications: Notification[]; unreadCount: number };
  meta: { total: number; page: number; limit: number; totalPages: number };
};

// ─── Payments ───────────────────────────────────────────────────────────────
export type PaymentMethod = {
  id: string;
  userId: string;
  type: "CREDIT_CARD" | "PAYPAL" | "MASTER_CARD" | "BKASH" | "NAGAD";
  name: string;
  last4: string | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
};

// ─── Reviews ────────────────────────────────────────────────────────────────
export type Review = HotelReview;

// ─── Searches ───────────────────────────────────────────────────────────────
export type RecentSearches = {
  hotels: string[];
  flights: string[];
};

// ─── Trips ──────────────────────────────────────────────────────────────────
export type Trip = {
  id: string;
  title: string;
  destination: string;
  duration: string;
  description: string;
  feature: string;
  image: string;
  peopleJoined: number;
  price: number;
  isRefundable: boolean;
  isPopular: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  packageDetails: { id: string; tripId: string; detail: string }[];
};

// ─── Users ──────────────────────────────────────────────────────────────────
export type MemberCard = {
  name: string;
  memberNumber: string;
  memberClass: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
  avatar: string | null;
};

// ─── Wishlist ───────────────────────────────────────────────────────────────
export type WishlistItem = {
  id: string;
  userId: string;
  hotelId: string | null;
  offerId: string | null;
  type: "HOTEL" | "FLIGHT";
  name: string;
  rating: number | null;
  createdAt: string;
  hotel: {
    name: string;
    location: string;
    rating: number;
    images: string[];
  } | null;
};
