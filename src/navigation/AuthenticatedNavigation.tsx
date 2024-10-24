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
  HOME_STACK: undefined;
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
      <Stack.Screen options={{ headerShown: false }} name="HOME_STACK" component={TabNavigation} />
      <Stack.Screen options={{ headerShown: false }} name="SELECT_LOCATION">
        {(props) => {
          return <LocationSelect {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="PICK_DATE">
        {(props) => {
          return <SelectDateScreen {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="SEARCH_RESULT">
        {(props) => {
          return <SearchResult {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="SEARCH_RESULT_DETAILS">
        {(props) => {
          return <HotelDetails {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="HOTEL_GALLERY">
        {(props) => {
          return <HotelGallery {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="AMENITIES">
        {(props) => {
          return <Amenities {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="REVIEW">
        {(props) => {
          return <ReviewsAndRatings {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="FULL_SCREEN_MAP">
        {(props) => {
          return <FullScreenMap {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="SELECT_ROOM">
        {(props) => {
          return <SelectRoom {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="REVIEW_BOOKING">
        {(props) => {
          return <ReviewBooking {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="RULES_AND_REGULATIONS">
        {(props) => {
          return <RulesAndRegulations {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="SWITCH_TO_FLIGHT">
        {(props) => {
          return <SwitchFlight {...props} />;
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthenticatedNavigation;
