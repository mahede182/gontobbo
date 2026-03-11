export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string | null;
  avatar: string | null;
  gender: string | null;
  phone: string | null;
  nationality: string | null;
  address: string | null;
  memberNumber: string | null;
  memberClass: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
  role: "USER" | "ADMIN";
  googleId?: string | null;
  appleId?: string | null;
  socialType?: "GOOGLE" | "APPLE" | "FACEBOOK" | "NONE";
  createdAt: string;
  updatedAt: string;
  passport?: Passport;
  flightPreference?: FlightPreference;
  baggages?: Baggage[];
};

export type Passport = {
  id: string;
  userId: string;
  passportNumber: string;
  nationality: string;
  dateOfBirth: string;
  dateOfIssue: string;
  dateOfExpiry: string;
  createdAt: string;
  updatedAt: string;
};

export type FlightPreference = {
  id: string;
  userId: string;
  isFlexibleDates: boolean;
  isNonStopFlights: boolean;
  isEarlyDeparture: boolean;
  isLateDeparture: boolean;
};

export type Baggage = {
  id: string;
  userId: string;
  type: "CABIN" | "CHECKED" | "SPECIAL" | "PASSPORT" | "VISA" | "INSURANCE" | "VACCINATION";
  name: string;
  description: string | null;
  weight: string;
  dimensions: string | null;
  status: "INCLUDED" | "EXTRA_FEE" | "NOT_ALLOWED" | "VALID" | "EXPIRED" | "MISSING";
  expiryDate?: Date;
  isRequired: boolean;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

// Standard API response wrapper from backend
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type ApiError = {
  success: false;
  error: {
    code: number;
    message: string;
    details?: string;
  };
};

// Auth endpoint responses
export type AuthResult = ApiResponse<{
  user: User;
  accessToken: string;
  refreshToken: string;
}>;

export interface GoogleUser {
  user: {
    photo: string;
    givenName: string;
    familyName: string;
    name: string;
    email: string;
    id: string;
  };
  idToken: string;
  serverAuthCode: string;
  scopes: string[];
}

export interface AppleUser {
  user: string;
  email: string | null;
  fullName: {
    familyName: string | null;
    givenName: string | null;
    middleName: string | null;
    namePrefix: string | null;
    nameSuffix: string | null;
    nickname: string | null;
  };
  identityToken: string;
  authorizationCode: string;
  realUserStatus: number;
  state: string | null;
}

export type SocialUser = GoogleUser | AppleUser;
