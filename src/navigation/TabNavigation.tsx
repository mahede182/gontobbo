import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreens from "@/screens/Home";
import TravelScreens from "@/screens/Explore";
import WishListScreens from "@/screens/Wishlist";
import ProfileScreen from "@/screens/Profile";
import { colors } from "@/theme/colors";
import { Image, StyleSheet } from "react-native";
import { images } from "@/theme/images";
import { Box, RestyleText } from "@/theme";
import { typography } from "@/theme/typography";
import OfferScreen from "@/screens/Offer";
import { useTranslation } from "react-i18next";

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
  EXPLORE: undefined;
  OFFER: undefined;
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
  const { t } = useTranslation();
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
          height: 60,
          paddingHorizontal: 10,
          backgroundColor: colors.tabBarBg,
        },
        tabBarItemStyle: {
          marginTop: 25,
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
            <Box alignItems={"center"} justifyContent={"center"}>
              <Image
                source={focused ? images.homeActive : images.home}
                tintColor={focused ? colors.tabSelected : colors.tabUnselected}
                style={{ height: 18, width: 18 }}
              />
              <RestyleText style={styles.title(focused)}>
                {t("common.home")}
              </RestyleText>
            </Box>
          ),
        }}
        component={HomeScreens}
      />
      <Tab.Screen
        name="EXPLORE"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Box alignItems={"center"} justifyContent={"center"}>
              <Image
                source={focused ? images.exploreActive : images.explore}
                tintColor={focused ? colors.tabSelected : colors.tabUnselected}
                style={{ height: 18, width: 22 }}
              />
              <RestyleText style={styles.title(focused)}>
                {t("common.explore")}
              </RestyleText>
            </Box>
          ),
        }}
        component={TravelScreens}
      />
      <Tab.Screen
        name="OFFERS"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Box alignItems={"center"} justifyContent={"center"}>
              <Image
                source={focused ? images.offerActive : images.offer}
                tintColor={focused ? colors.tabSelected : colors.tabUnselected}
                style={{ height: 18, width: 18 }}
              />
              <RestyleText style={styles.title(focused)}>
                {t("common.offers")}
              </RestyleText>
            </Box>
          ),
        }}
        component={OfferScreen}
      />
      <Tab.Screen
        name="WISHLIST"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Box alignItems={"center"} justifyContent={"center"}>
              <Image
                source={focused ? images.wishlistActive : images.wishlist}
                tintColor={focused ? colors.tabSelected : colors.tabUnselected}
                style={{ height: 18, width: 22 }}
              />
              <RestyleText style={styles.title(focused)}>
                {t("common.wishlist")}
              </RestyleText>
            </Box>
          ),
        }}
        component={WishListScreens}
      />
      <Tab.Screen
        name="PROFILE"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Box alignItems={"center"} justifyContent={"center"}>
              <Image
                source={focused ? images.profileActive : images.profile}
                tintColor={focused ? colors.tabSelected : colors.tabUnselected}
                style={{ height: 18, width: 18 }}
              />
              <RestyleText style={styles.title(focused)}>
                {t("common.profile")}
              </RestyleText>
            </Box>
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  title: (focused: boolean) => ({
    marginTop: 3,
    fontFamily: focused ? typography.poppinsMedium : typography.poppinsRegular,
    fontSize: 12,
    fontWeight: focused ? "600" : "400",
    color: focused ? colors.tabSelected : colors.tabUnselected,
  }),
});
