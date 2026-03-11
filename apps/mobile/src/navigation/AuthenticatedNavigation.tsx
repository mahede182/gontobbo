import { createStackNavigator } from "@react-navigation/stack";
import LocationSelect from "@/screens/Explore/SelectLocation";
import SelectDateScreen from "@/screens/Explore/DatePicker";
import SearchResult from "@/screens/Explore/SearchResult";
import HotelDetails from "@/screens/Explore/HotelDetails";
import HotelGallery from "@/screens/Explore/HotelGallery";
import Amenities from "@/screens/Explore/Amenities";
import ReviewsAndRatings from "@/screens/Explore/ReviewAndRating";
import FullScreenMap from "@/screens/Explore/FullScreenMap";
import SelectRoom from "@/screens/Explore/SelectRoom";
import ReviewBooking from "@/screens/Explore/ReviewBooking";
import RulesAndRegulations from "@/screens/Explore/RulesAndRegulations";
import SwitchFlight from "@/screens/Explore/component/SwitchFlight";
import TabNavigation from "./TabNavigation";
import TripReviewBookingScreen from "@/screens/TripReviewBooking/TripReviewBookingScreen";
import AddNewTraveller from "@/screens/TripReviewBooking/AddedTraveller";
import SuccessfulBookingScreen from "@/screens/SuccessfulBooking/SuccessfulBookingScreen";
import NotificationScreen from "@/screens/Notification/NotificationScreen";
import { ProfileNavigation } from "./ProfileNavigation";
import React from "react";
import { AuthdStackParamList } from "@/@types/navigation.type";

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<AuthdStackParamList>();

const AuthenticatedNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="HOME_STACK" component={TabNavigation} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SELECT_LOCATION"
        component={LocationSelect}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PICK_DATE"
        component={SelectDateScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SEARCH_RESULT"
        component={SearchResult}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SEARCH_RESULT_DETAILS"
        component={HotelDetails}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="HOTEL_GALLERY"
        component={HotelGallery}
      />
      <Stack.Screen options={{ headerShown: false }} name="AMENITIES" component={Amenities} />
      <Stack.Screen options={{ headerShown: false }} name="REVIEW" component={ReviewsAndRatings} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="FULL_SCREEN_MAP"
        component={FullScreenMap}
      />
      <Stack.Screen options={{ headerShown: false }} name="SELECT_ROOM" component={SelectRoom} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="REVIEW_BOOKING"
        component={ReviewBooking}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="RULES_AND_REGULATIONS"
        component={RulesAndRegulations}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SWITCH_TO_FLIGHT"
        component={SwitchFlight}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TRIP_REVIEW_BOOKING"
        component={TripReviewBookingScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ADD_TRAVELLER"
        component={AddNewTraveller}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="BOOKING_SUCCESS"
        component={SuccessfulBookingScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="NOTIFICATION"
        component={NotificationScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PROFILE_CONTAINER"
        component={ProfileNavigation}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedNavigation;
