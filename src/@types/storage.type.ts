export type FavouriteItem = {
  id: number;
  name: string;
  rating: number;
  type: "hotel" | "flight";
};

export type UserProfile = {
  fullName: string;
  email: string;
  phoneNumber: string;
  nationality: string;
  address: string;
  accessToken: string;
  refreshToken: string;
  passportDetails: {
    passportNumber: string;
    nationality: string;
    dateOfBirth: string;
    dateOfIssue: string;
    dateOfExpiry: string;
  };
  flightPreferences: {
    isFlexibleDates: boolean;
    isNonStopFlights: boolean;
    isEarlyDeparture: boolean;
    isLateDeparture: boolean;
  };
};

export type AsyncStorageData = {
  user: {
    profile: UserProfile;
    wishlist: FavouriteItem[];
    recentSearches: {
      hotels: string[];
      flights: string[];
    };
    bookingHistory: {
      hotels: string[];
      flights: string[];
    };
  };
};

export const STORAGE_KEYS = {
  USER: "@user",
  USER_PROFILE: "@user_profile",
  WISHLIST: "@wishlist",
  RECENT_SEARCHES: "@recent_searches",
  BOOKING_HISTORY: "@booking_history",
} as const;
