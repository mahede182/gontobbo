import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthenticatingNavigation, { AuthStackParamList } from "./AuthenticatingNavigation";
import { AppProvider } from "@/hooks/useApp";
import IntroNavigation, { IntroStackParamList } from "./IntroNavigation";
import AuthenticatedNavigation, { AuthdStackParamList } from "./AuthenticatedNavigation";

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
  INITIAL_LOAD: IntroStackParamList;
  AUTH: AuthStackParamList;
  HOME: AuthdStackParamList;
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="INITIAL_LOAD"
            component={IntroNavigation}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="AUTH"
            component={AuthenticatingNavigation}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="HOME"
            component={AuthenticatedNavigation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default RootNavigation;
