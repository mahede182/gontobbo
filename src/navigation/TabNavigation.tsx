import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreens from "../screens/Home";
import TravelScreens from "../screens/Travel";
import WishListScreens from "../screens/Wishlist";
import ProfileScreen from "../screens/Profile";
import {
  Ionicons,
  FontAwesome,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";

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
          backgroundColor: "rgba(0,0,0, 0.2)",
          borderTopWidth: 0,
          position: "absolute",
          bottom: 0,
          left: 0,
          shadowColor: "transparent",
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
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={32}
              color={focused ? "#0A906E" : "#000000"}
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
            <FontAwesome
              name={focused ? "plane" : "plane"}
              size={32}
              color={focused ? "#0A906E" : "#000000"}
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
            <FontAwesome6
              name="clipboard-list"
              size={32}
              color={focused ? "#0A906E" : "#000000"}
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
            <MaterialIcons
              name="assignment-ind"
              size={32}
              color={focused ? "#0A906E" : "#000000"}
            />
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
