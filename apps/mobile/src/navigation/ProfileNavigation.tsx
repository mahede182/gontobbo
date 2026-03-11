import FlightInformation from "@/screens/Profile/FlightInformation";
import FlightPreferencesScreen from "@/screens/Profile/FlightPreferences";
import MemberCard from "@/screens/Profile/MemberCard";
import PassportDetailsScreen from "@/screens/Profile/PassportDetails";
import PaymentMethodScreen from "@/screens/Profile/PaymentDetails";
import PersonalInformationScreen from "@/screens/Profile/PersonalInfo";
import TravelRequirementScreen from "@/screens/Profile/TravelRequirement";
import BaggagesScreen from "@/screens/Profile/Baggages";
import LegalScreen from "@/screens/Profile/Legal";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileStackParamList } from "@/@types/navigation.type";
import WishList from "@/screens/Profile/WishList";

const Stack = createStackNavigator<ProfileStackParamList>();
export const ProfileNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="MEMBER_CARD" component={MemberCard} />
      <Stack.Screen options={{ headerShown: false }} name="WISH_LIST" component={WishList} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PERSONAL_INFO"
        component={PersonalInformationScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PASSPORT_DETAILS"
        component={PassportDetailsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PAIMENT_METHOD"
        component={PaymentMethodScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="FLIGHT_PREFERENCES"
        component={FlightPreferencesScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="FLIGHT_INFORMATION"
        component={FlightInformation}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TRAVEL_REQUIREMENT"
        component={TravelRequirementScreen}
      />
      <Stack.Screen options={{ headerShown: false }} name="BAGGAGES" component={BaggagesScreen} />
      <Stack.Screen options={{ headerShown: false }} name="LEGAL" component={LegalScreen} />
    </Stack.Navigator>
  );
};
