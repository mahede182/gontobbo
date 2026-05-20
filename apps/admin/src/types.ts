/* ─── Domain Models ─── */

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: string;
  phone?: string;
  isActive: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  location?: string;
}

export interface Room {
  id: string;
  name: string;
  hotel?: Hotel;
  bedType: string;
  view: string;
  price: number;
  maxGuests: number;
  isAvailable: boolean;
  images: string[];
}

export interface Booking {
  id: string;
  user: User;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: string;
  paymentMethod: string;
  room?: Room;
  rooms: number;
}

export interface Order {
  id: string;
  user: User;
  items: OrderItem[];
  totalPrice: number;
  totalAmount?: number;
  status: string;
  createdAt: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  booking?: Booking;
  user: User;
  amount: number;
  status: string;
  issuedAt: string;
  dueDate: string;
  paidAt?: string;
}

export interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  phone: string;
  joinedAt: string;
  isActive: boolean;
  avatar?: string;
}

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  totalBookings: number;
  lastVisit?: string;
  isActive: boolean;
}

export interface ReportSummary {
  totalRevenue: number;
  totalBookings: number;
  occupancyRate: number;
  avgOrderValue: number;
  revenueChange: number;
  bookingsChange: number;
  occupancyChange: number;
  avgOrderChange: number;
  monthlyRevenue: { month: string; revenue: number; bookings: number }[];
  recentBookings: Booking[];
}

/* ─── Pagination ─── */

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

/* ─── Filter Option ─── */

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}
