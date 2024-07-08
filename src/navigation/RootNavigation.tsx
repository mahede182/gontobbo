import HomeScreens from "../screens/HomeScreens";
import FavouriteScreens from "../screens/FavouriteScreens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { HomeParamList } from "../types/navigation.type";

const Stack = createStackNavigator<HomeParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="HOME"
          component={HomeScreens}
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
