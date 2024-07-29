import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreens from "@/screens/Home";
import TravelScreens from "@/screens/Travel";
import WishListScreens from "@/screens/Wishlist";
import ProfileScreen from "@/screens/Profile";
import { Entypo, Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { Image } from "react-native";
import Percent from "@/assets/percent.png";

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

export type TabStackParamList = {
  HOME: undefined;
  TRAVEL: undefined;
  WISHLIST: undefined;
  PROFILE: undefined;
};
/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * * More info: https://reactnavigation.org/docs/tab-based-navigation
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigation = (props: Props) => {
  return (
    <Tab.Navigator
      initialRouteName="HOME"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          position: "absolute",
          bottom: 0,
          left: 0,
          shadowColor: "transparent",
          paddingVertical: 5,
        },
        tabBarActiveTintColor: "white",
        tabBarHideOnKeyboard: true,
        unmountOnBlur: true,
      }}
    >
      <Tab.Screen
        name="HOME"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="home"
              size={24}
              color={focused ? colors.tabSelected : colors.tabUnselected}
            />
          ),
        }}
        component={HomeScreens}
      />
      <Tab.Screen
        name="TRAVEL"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="planet-outline"
              size={24}
              color={focused ? colors.tabSelected : colors.tabUnselected}
            />
          ),
        }}
        component={TravelScreens}
      />
      <Tab.Screen
        name="WISHLIST"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Image
              source={Percent}
              tintColor={focused ? colors.tabSelected : colors.tabUnselected}
            />
          ),
        }}
        component={WishListScreens}
      />
      <Tab.Screen
        name="FAVOURITE"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="hearto"
              size={24}
              color={focused ? colors.tabSelected : colors.tabUnselected}
            />
          ),
        }}
        component={WishListScreens}
      />
      <Tab.Screen
        name="PROFILE"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user-o"
              size={24}
              color={focused ? colors.tabSelected : colors.tabUnselected}
            />
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
