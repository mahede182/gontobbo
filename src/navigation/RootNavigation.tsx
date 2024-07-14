import FavouriteScreens from "../screens/Favourite";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./TabNavigation";

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
          name="TAB"
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
