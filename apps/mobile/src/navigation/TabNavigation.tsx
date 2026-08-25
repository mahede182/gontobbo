import React from "react";
import { Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "@/theme/colors";
import { images } from "@/theme/images";
import { Box, RestyleText } from "@/theme";
import { typography } from "@/theme/typography";
import { useTranslation } from "react-i18next";
import ChatScreen from "@/screens/Chat";
import TravelScreens from "@/screens/Explore";
import ProfileScreen from "@/screens/Profile";
import DrawerNavigation from "./DrawerNavigation";
import { TabStackParamList } from "@/@types/navigation.type";
import { dynamicCss } from "@/utils/styles";
import BookingsScreens from "@/screens/Bookings";

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigation = () => {
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
        tabBarActiveTintColor: "white100",
        tabBarHideOnKeyboard: true,
        unmountOnBlur: true,
      }}>
      <Tab.Screen
        name="DRAWER"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Box alignItems={"center"} justifyContent={"center"}>
              <Image
                source={focused ? images.homeActive : images.home}
                tintColor={focused ? colors.tabSelected : colors.tabUnselected}
                style={styles.imgStyle}
              />
              <RestyleText
                style={[
                  styles.title,
                  dynamicCss(
                    "fontFamily",
                    focused ? typography.poppinsMedium : typography.poppinsRegular,
                  ),
                  dynamicCss("fontWeight", focused ? "600" : "400"),
                  dynamicCss("color", focused ? colors.tabSelected : colors.tabUnselected),
                ]}>
                {t("common.home")}
              </RestyleText>
            </Box>
          ),
        }}
        component={DrawerNavigation}
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
              <RestyleText
                style={[
                  styles.title,
                  dynamicCss(
                    "fontFamily",
                    focused ? typography.poppinsMedium : typography.poppinsRegular,
                  ),
                  dynamicCss("fontWeight", focused ? "600" : "400"),
                  dynamicCss("color", focused ? colors.tabSelected : colors.tabUnselected),
                ]}>
                {t("common.explore")}
              </RestyleText>
            </Box>
          ),
        }}
        component={TravelScreens}
      />
      <Tab.Screen
        name="CHAT"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Box alignItems={"center"} justifyContent={"center"}>
              <Image
                source={focused ? images.chatActive : images.chat}
                tintColor={focused ? colors.tabSelected : colors.tabUnselected}
                style={styles.imgStyle}
              />
              <RestyleText
                style={[
                  styles.title,
                  dynamicCss(
                    "fontFamily",
                    focused ? typography.poppinsMedium : typography.poppinsRegular,
                  ),
                  dynamicCss("fontWeight", focused ? "600" : "400"),
                  dynamicCss("color", focused ? colors.tabSelected : colors.tabUnselected),
                ]}>
                {t("common.chat")}
              </RestyleText>
            </Box>
          ),
        }}
        component={ChatScreen}
      />
      <Tab.Screen
        name="BOOKINGS"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Box alignItems={"center"} justifyContent={"center"}>
              <Image
                source={focused ? images.bookingActive : images.booking}
                tintColor={focused ? colors.tabSelected : colors.tabUnselected}
                style={{ height: 18, width: 22 }}
              />
              <RestyleText
                style={[
                  styles.title,
                  dynamicCss(
                    "fontFamily",
                    focused ? typography.poppinsMedium : typography.poppinsRegular,
                  ),
                  dynamicCss("fontWeight", focused ? "600" : "400"),
                  dynamicCss("color", focused ? colors.tabSelected : colors.tabUnselected),
                ]}>
                {t("common.bookings")}
              </RestyleText>
            </Box>
          ),
        }}
        component={BookingsScreens}
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
                style={styles.imgStyle}
              />
              <RestyleText
                style={[
                  styles.title,
                  dynamicCss(
                    "fontFamily",
                    focused ? typography.poppinsMedium : typography.poppinsRegular,
                  ),
                  dynamicCss("fontWeight", focused ? "600" : "400"),
                  dynamicCss("color", focused ? colors.tabSelected : colors.tabUnselected),
                ]}>
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
  title: {
    marginTop: 3,
    fontSize: 12,
  },
  imgStyle: { height: 18, width: 18 },
});
