import { createNavigationContainerRef } from "@react-navigation/native";
import { AppleUser, GoogleUser, SocialUser } from "@/@types/auth.type";
import { Booking } from "@/@types/api.type";

/**
 * Validates an email address using a regular expression.
 * <>inspired by: https://stackoverflow.com/questions/43676695/email-validation-react-native-returning-the-result-as-invalid-for-all-the-e
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates an email address using a regular expression.
 * <>inspired by: https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
 * @param {string} password - The email address to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return passwordRegex.test(password);
};

/**
 * <> Get the current route name from the navigation ref.
 */
export const navigationRef = createNavigationContainerRef();

export function getCurrentRouteName() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name;
  } else {
    return undefined;
  }
}

/**
 * Type guard to check if the user data is from Google Sign-In
 * @param userData - The user data to check
 * @returns boolean indicating if it's Google user data
 */
export const isGoogleUser = (userData: SocialUser | null): userData is GoogleUser => {
  if (!userData) return false;
  return "user" in userData && typeof userData.user === "object";
};

/**
 * Type guard to check if the user data is from Apple Sign-In
 * @param userData - The user data to check
 * @returns boolean indicating if it's Apple user data
 */
export const isAppleUser = (userData: SocialUser | null): userData is AppleUser => {
  if (!userData) return false;
  return "user" in userData && typeof userData.user === "string";
};

/**
 * Gets the email from user data
 * @param userData - The user data
 * @returns email or default value
 */
export const getEmail = (userData: SocialUser | null): string => {
  if (!userData) return "No email";

  if (isGoogleUser(userData)) {
    return userData.user.email;
  } else if (isAppleUser(userData)) {
    return userData.email || "Private email";
  }
  return "No email";
};

/**
 * Gets the user ID from user data and trims it for display
 * @param userData - The user data
 * @param maxLength - Maximum length of the ID to display (default: 10)
 * @returns trimmed user ID or default value
 */
export const getUserId = (userData: SocialUser | null, maxLength: number = 10): string => {
  if (!userData) return "N/A";

  let id: string;
  if (isGoogleUser(userData)) {
    id = userData.user.id;
  } else if (isAppleUser(userData)) {
    id = userData.user;
  } else {
    return "N/A";
  }

  // Trim the ID if it's longer than maxLength
  if (id.length > maxLength) {
    return `${id.slice(0, maxLength)}...`;
  }

  return id;
};

/**
 * Gets the profile photo URL from user data
 * @param userData - The user data
 * @returns profile photo URL or null
 */
export const getProfilePhoto = (userData: SocialUser | null): string | null => {
  if (!userData) return null;

  if (isGoogleUser(userData)) {
    return userData.user.photo;
  }
  return null;
};

/**
 * Gets the authentication provider name
 * @param userData - The user data
 * @returns provider name or default value
 */
export const getAuthProvider = (userData: SocialUser | null): string => {
  if (!userData) return "None";
  return isGoogleUser(userData) ? "Google" : "Apple";
};

/**
 * Encodes a URI component.
 * @param {string | number} val - The value to encode.
 * @returns {string} - The encoded URI component.
 */
export const encdUri = (val: string | number): string => {
  return encodeURIComponent(val.toString());
};

export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

export const getImageUri = (booking: Booking): string | null => {
  if (booking.type === "HOTEL") return booking.hotel?.images?.[0] ?? null;
  return booking.trip?.image ?? null;
};
