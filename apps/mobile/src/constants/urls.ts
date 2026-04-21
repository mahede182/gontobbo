import { Platform } from "react-native";
import { encdUri } from "../utils/helper";

// Android emulator uses 10.0.2.2 to reach host localhost
// iOS simulator can use localhost directly
// Physical device: replace with your machine's LAN IP (e.g. 192.168.1.x)
const DEV_HOST = Platform.select({
  android: "10.0.2.2",
  default: "localhost",
});

const DEFAULT_DEV_URL = `http://${DEV_HOST}:10000/api`;
export const BASE_URL = process.env.EXPO_PUBLIC_API_URL || DEFAULT_DEV_URL;

export const LOGIN = "/auth/login";
export const REGISTER = "/auth/register";
export const GOOGLE_LOGIN = "/auth/google";
export const APPLE_LOGIN = "/auth/apple";
export const GUEST_LOGIN = "/auth/guest";
export const GET_ME = "/auth/me";
export const LOGOUT = "/auth/logout";

export const BOOKINGS = "/bookings";
export const BOOKING_DETAIL = (id: string | number) => `/bookings/${encdUri(id)}`;
export const BOOKING_CANCEL = (id: string | number) => `/bookings/${encdUri(id)}/cancel`;
export const BOOKING_TRAVELLERS = (bookingId: string | number) =>
  `/bookings/${encdUri(bookingId)}/travellers`;

export const FLIGHTS = "/flights";
export const FLIGHT_DETAIL = (id: string | number) => `/flights/${encdUri(id)}`;

export const HOTELS_FEATURED = "/hotels/featured";
export const HOTELS = "/hotels";
export const HOTEL_DETAIL = (id: string | number) => `/hotels/${encdUri(id)}`;
export const HOTEL_ROOMS = (hotelId: string | number) => `/hotels/${encdUri(hotelId)}/rooms`;
export const HOTEL_GALLERY = (hotelId: string | number) => `/hotels/${encdUri(hotelId)}/gallery`;
export const HOTEL_AMENITIES = (hotelId: string | number) =>
  `/hotels/${encdUri(hotelId)}/amenities`;
export const HOTEL_REVIEWS = (hotelId: string | number) => `/hotels/${encdUri(hotelId)}/reviews`;
export const LOCATIONS = "/locations";
export const LOCATIONS_POPULAR = "/locations/popular";
export const NOTIFICATIONS = "/notifications";
export const NOTIFICATION_READ = (id: string | number) => `/notifications/${encdUri(id)}/read`;
export const NOTIFICATIONS_READ_ALL = "/notifications/read-all";

export const PAYMENTS_METHODS = "/payments/methods";
export const PAYMENT_METHOD_DETAIL = (id: string | number) => `/payments/methods/${encdUri(id)}`;
export const REVIEWS = "/reviews";
export const REVIEW_DETAIL = (id: string | number) => `/reviews/${encdUri(id)}`;

export const SEARCHES_RECENT = "/searches/recent";

export const CHAT_AI = "/chat";

export const TRIPS_POPULAR = "/trips/popular";
export const TRIPS = "/trips";
export const TRIP_DETAIL = (id: string | number) => `/trips/${encdUri(id)}`;

export const USERS_ME = "/users/me";
export const USERS_MEMBER_CARD = "/users/me/member-card";
export const USERS_PASSPORT = "/users/me/passport";
export const USERS_FLIGHT_PREFERENCES = "/users/me/flight-preferences";
export const USERS_BAGGAGE = "/users/me/baggage";

export const WISHLIST = "/wishlist";
export const WISHLIST_ITEM = (id: string | number) => `/wishlist/${encdUri(id)}`;
