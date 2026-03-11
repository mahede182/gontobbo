import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthenticatingNavigation from "./AuthenticatingNavigation";
import AuthenticatedNavigation from "./AuthenticatedNavigation";
import { navigationRef } from "@/utils/helper";
import { useHydrate } from "@/hooks/useHydrate";
import { useAppSelector } from "@/store/hooks";
import OnboardScreen from "@/screens/Onboard/OnboardScreen";
import { RootStackParamList } from "@/@types/navigation.type";

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const { isAuthenticated, isGuest, isLoading } = useAppSelector((state) => state.auth);

  // flow = login -> Home or otherwise -> register/login
  useHydrate();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {isAuthenticated || isGuest ? (
          <Stack.Screen
            options={{ headerShown: false }}
            name="AUTHENTICATED"
            component={AuthenticatedNavigation}
          />
        ) : (
          <>
            {/* Can put ONBOARD before AUTHENTICATING later when implementing onboarding logic */}
            <Stack.Screen
              options={{ headerShown: false }}
              name="AUTHENTICATING"
              component={AuthenticatingNavigation}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ONBOARD"
              component={OnboardScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
