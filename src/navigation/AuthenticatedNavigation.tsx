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
import TabNavigation, { TabStackParamList } from "./TabNavigation";

export type AuthdStackParamList = {
  TAB: TabStackParamList;
  HOME: undefined;
  SELECT_LOCATION: undefined;
  PICK_DATE: undefined;
  SEARCH_RESULT: undefined;
  SEARCH_RESULT_DETAILS: undefined;
  HOTEL_GALLERY: undefined;
  AMENITIES: undefined;
  REVIEW: undefined;
  FULL_SCREEN_MAP: undefined;
  SELECT_ROOM: undefined;
  REVIEW_BOOKING: undefined;
  RULES_AND_REGULATIONS: undefined;
  SWITCH_FLIGHT: undefined;
  SWITCH_TO_FLIGHT: undefined;
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<AuthdStackParamList>();

const AuthenticatedNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="HOME" component={TabNavigation} />
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
    </Stack.Navigator>
  );
};

export default AuthenticatedNavigation;
