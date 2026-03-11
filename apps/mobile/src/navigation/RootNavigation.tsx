import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthenticatingNavigation from "./AuthenticatingNavigation";
import AuthenticatedNavigation from "./AuthenticatedNavigation";
import OnboardScreen from "@/screens/Onboard/OnboardScreen";
import { navigationRef } from "@/utils/helper";
import { useHydrate } from "@/hooks/useHydrate";
import { useAppSelector } from "@/store/hooks";
import { RootStackParamList } from "@/@types/navigation.type";

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const { isAuthenticated, isGuest, isLoading } = useAppSelector((state) => state.auth);
  const isFirstLaunch = useAppSelector((state) => state.app.isFirstLaunch);

  useHydrate();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated || isGuest ? (
          <Stack.Screen name="AUTHENTICATED" component={AuthenticatedNavigation} />
        ) : isFirstLaunch ? (
          <Stack.Screen name="ONBOARD" component={OnboardScreen} />
        ) : (
          <Stack.Screen name="AUTHENTICATING" component={AuthenticatingNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
