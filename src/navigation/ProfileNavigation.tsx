import MemberCard from "@/screens/Profile/MemberCard";
import PassportDetailsScreen from "@/screens/Profile/PassportDetails";
import PaymentMethodScreen from "@/screens/Profile/PaymentDetails";
import PersonalInformationScreen from "@/screens/Profile/PersonalInfo";
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
    </Stack.Navigator>
  );
};
