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

const Stack = createStackNavigator();
export const ProfileNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="MEMBER_CARD">
        {(props) => {
          return <MemberCard {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="PERSONAL_INFO">
        {(props) => {
          return <PersonalInformationScreen {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="PASSPORT_DETAILS">
        {(props) => {
          return <PassportDetailsScreen {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="PAIMENT_METHOD">
        {(props) => {
          return <PaymentMethodScreen {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="FLIGHT_PREFERENCES">
        {(props) => {
          return <FlightPreferencesScreen {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="FLIGHT_INFORMATION">
        {(props) => {
          return <FlightInformation {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="TRAVEL_REQUIREMENT">
        {(props) => {
          return <TravelRequirementScreen {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="BAGGAGES">
        {(props) => {
          return <BaggagesScreen {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="LEGAL">
        {(props) => {
          return <LegalScreen {...props} />;
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
