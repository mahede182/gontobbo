import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation, { TabStackParamList } from "./TabNavigation";
import AuthNavigation from "./AuthNavigation";
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
import InitScreen from "@/screens/Init/InitScreen";
import SwitchFlight from "@/screens/Explore/component/SwitchFlight";
import { AppProvider } from "@/hooks/useApp";
import { useEffect, useState } from "react";
import { useMachine } from "@xstate/react";
import { initialLoad } from "@/machine/initialLoad";
import { clear, getItem } from "@/utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */

export type RootStackParamList = {
  HOME: undefined;
  FAVOURITE: undefined;
  TAB: TabStackParamList;
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const [state, send] = useMachine(initialLoad);
  const { isFirstTime } = state.context;
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const init = async () => {
      const res = await AsyncStorage.getItem("init");
      setLoad(!!res);
      console.log(load, "load");
    };
    init();
  }, []);

  return (
    <NavigationContainer>
      {/* FIXME: refact as remove counter provider */}
      <AppProvider>
        <Stack.Navigator>
          {load && (
            <Stack.Screen options={{ headerShown: false }} name="Init" component={InitScreen} />
          )}
          <Stack.Screen options={{ headerShown: false }} name="AUTH" component={AuthNavigation} />
          <Stack.Screen options={{ headerShown: false }} name="HOME" component={TabNavigation} />
          {/* FIXME: refactor as separate stack */}
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
          <Stack.Screen
            options={{ headerShown: false }}
            name="REVIEW"
            component={ReviewsAndRatings}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="FULL_SCREEN_MAP"
            component={FullScreenMap}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SELECT_ROOM"
            component={SelectRoom}
          />
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
          {/* <Stack.Screen options={{ headerShown: false }} name="DRAWER" component={DrawerNavigation} /> */}
          <Stack.Screen
            options={{ headerShown: false }}
            name="SWITCH_TO_FLIGHT"
            component={SwitchFlight}
          />
        </Stack.Navigator>
      </AppProvider>
    </NavigationContainer>
  );
};

export default RootNavigation;
