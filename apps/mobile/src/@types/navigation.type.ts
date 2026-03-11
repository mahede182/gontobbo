import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type HomeParamList = {
  HOME: undefined;
  FAVOURITE: undefined;
  ADD_EMAIL: {
    example: "";
  };
};

export type AuthdStackParamList = {
  TAB: TabStackParamList;
  HOME_STACK: undefined;
  SELECT_LOCATION: undefined;
  PICK_DATE: undefined;
  SEARCH_RESULT: any;
  SEARCH_RESULT_DETAILS: any;
  HOTEL_GALLERY: any;
  AMENITIES: any;
  REVIEW: any;
  FULL_SCREEN_MAP: any;
  SELECT_ROOM: any;
  REVIEW_BOOKING: any;
  RULES_AND_REGULATIONS: any;
  SWITCH_FLIGHT: any;
  SWITCH_TO_FLIGHT: any;
  TRIP_REVIEW_BOOKING: any;
  ADD_TRAVELLER: any;
  BOOKING_SUCCESS: any;
  NOTIFICATION: any;
  PROFILE_CONTAINER: any;
};

export type TabStackParamList = {
  HOME: undefined;
  EXPLORE: undefined;
  OFFERS: undefined;
  WISHLIST: undefined;
  PROFILE: undefined;
  DRAWER: undefined;
};

export type AuthStackParamList = {
  LOGIN: undefined;
  EMAIL_LOGIN: undefined;
  REGISTER: undefined;
};

export type ProfileStackParamList = {
  PROFILE: undefined;
  MEMBER_CARD: undefined;
  PERSONAL_INFO: undefined;
  PASSPORT_DETAILS: undefined;
  PAIMENT_METHOD: undefined;
  FLIGHT_PREFERENCES: undefined;
  FLIGHT_INFORMATION: undefined;
  TRAVEL_REQUIREMENT: undefined;
  BAGGAGES: undefined;
  LEGAL: undefined;
};

export type RootStackParamList = {
  ONBOARD: undefined;
  AUTHENTICATING: undefined;
  AUTHENTICATED: undefined;
};

export type FavScreenNavigationProp = StackNavigationProp<HomeParamList>;

export type AddEmailScreenRouteList = RouteProp<HomeParamList, "ADD_EMAIL">;
