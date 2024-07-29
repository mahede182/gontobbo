import FavouriteScreens from "@/screens/Favourite";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./TabNavigation";
import AuthNavigation from "./AuthNavigation";

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
  TAB: undefined;
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="NONE"
          component={AuthNavigation}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="HOME"
          component={TabNavigation}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="FAVOURITE"
          component={FavouriteScreens}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
