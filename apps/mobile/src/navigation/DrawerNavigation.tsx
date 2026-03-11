import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Home from "@/screens/Home";
import { colors } from "@/theme/colors";
import { images } from "@/theme/images";
import { LinearGradient } from "expo-linear-gradient";
import { typography } from "@/theme/typography";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { Box, RestyleText } from "@/theme";
import GradientTitle from "@/components/GradientTitle";
import { dynamicCSS } from "@/utils/styles";
import { useLogoutMutation } from "@/store/api/authApi";
import { clearTokens, getTokens } from "@/utils/storage";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
type Props = {};

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { logout } = useAuth();
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    const tokens = await getTokens();
    try {
      await logoutMutation({ refreshToken: tokens?.refreshToken }).unwrap();
    } catch (error) {
      console.error("Logout mutation failed", error);
    } finally {
      await clearTokens();
      logout();
    }
  };

  return (
    <BlurView intensity={100} tint="prominent" style={dynamicCSS("flex", 1)}>
      <DrawerContentScrollView {...props}>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileTab")}>
          <LinearGradient
            colors={[colors.linearStart, colors.linearEnd]}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.75, y: 0 }}
            style={styles.drawerHeader}>
            <View style={styles.imgContainer}>
              <Image source={images.appLogo} style={styles.profilePicture} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Sign In</Text>
              <Text style={styles.userEmail}>Get Personalized Tips and Deals</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* ::: My Trip ::: */}
        <Box style={styles.group}>
          <GradientTitle style={dynamicCSS("marginBottom", 5)}>My Trip</GradientTitle>
          <TouchableOpacity style={styles.drawerItemContainer}>
            <Image source={images.myBookingIcon} style={styles.iconStyle} />
            <RestyleText>My Booking</RestyleText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItemContainer}>
            <Image source={images.savedIcon} style={styles.iconStyle} />
            <RestyleText>Saved</RestyleText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItemContainer}>
            <Image source={images.referIcon} style={styles.iconStyle} />
            <RestyleText>Refer</RestyleText>
          </TouchableOpacity>
        </Box>
        {/* ::: Settings ::: */}
        <Box style={styles.group}>
          <GradientTitle style={dynamicCSS("marginBottom", 5)}>Settings</GradientTitle>
          <TouchableOpacity style={styles.drawerItemContainer}>
            <Image source={images.supportIcon} style={styles.iconStyle} />
            <RestyleText>Support</RestyleText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItemContainer}>
            <Image source={images.rateUsIcon} style={styles.iconStyle} />
            <RestyleText>Rate Us</RestyleText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItemContainer}>
            <Image source={images.languegeIcon} style={styles.iconStyle} />
            <RestyleText>Language</RestyleText>
          </TouchableOpacity>
        </Box>
        {/* ::: Logout ::: */}
        <Box style={styles.group}>
          <TouchableOpacity onPress={handleLogout} style={styles.drawerItemContainer}>
            <Image source={images.logoutIcon} style={styles.iconStyle} />
            <RestyleText>Logout</RestyleText>
          </TouchableOpacity>
        </Box>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </BlurView>
  );
};

const DrawerNavigation = (props: Props) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.neutral100,
          borderColor: colors.black,
        },
        freezeOnBlur: true,
        drawerType: "slide",
      }}>
      <Drawer.Screen
        name="v1.0.1"
        component={Home}
        options={{
          drawerInactiveBackgroundColor: colors.neutral50,
          drawerItemStyle: {
            marginTop: 80,
            marginHorizontal: 20,
            paddingHorizontal: 15,
            borderRadius: 10,
            backgroundColor: colors.neutral100,
          },
          drawerLabelStyle: {
            fontFamily: typography.poppinsRegular,
            color: colors.black,
            textAlign: "left",
            fontSize: 12,
            fontWeight: "400",
          },
          drawerContentStyle: {
            flexDirection: "row",
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 5,
  },
  imgContainer: {
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 100,
  },
  profilePicture: {
    height: 36,
    width: 36,
    padding: 5,
    resizeMode: "contain",
  },
  userName: {
    fontFamily: typography.poppinsBold,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
  },
  userEmail: {
    fontFamily: typography.poppinsRegular,
    fontSize: 14,
    color: colors.white,
    width: "80%",
  },
  userInfo: {
    padding: 16,
  },
  group: {
    borderColor: colors.neutral500,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  drawerItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  iconStyle: {
    height: 16,
    width: 16,
    marginRight: 5,
    resizeMode: "contain",
  },
});
