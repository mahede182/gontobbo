import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Favourite from "@/screens/Favourite";
import Profile from "@/screens/Profile";
import Home from "@/screens/Home";
import { colors } from "@/theme/colors";
import { typography } from "@shopify/restyle";
import { images } from "@/theme/images";
import { LinearGradient } from "expo-linear-gradient";

type Props = {};

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <LinearGradient
        colors={[colors.linearStart, colors.linearEnd]}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.75, y: 0 }}
        style={styles.drawerHeader}>
        <Image source={images.appLogo} style={styles.profilePicture} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Sign In</Text>
          <Text style={styles.userEmail}>Get Personalized Tips and Deals</Text>
        </View>
      </LinearGradient>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
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
        },
        drawerActiveTintColor: colors.neutral700,
        drawerInactiveTintColor: colors.neutral500,
      }}>
      <Drawer.Screen
        name="My Booking"
        component={Home}
        options={{
          drawerIcon: ({ color }) => <Image source={images.offer} style={{ tintColor: color }} />,
        }}
      />
      <Drawer.Screen
        name="Saved"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => <Image source={images.offer} style={{ tintColor: color }} />,
        }}
      />
      <Drawer.Screen
        name="Refer"
        component={Home}
        options={{
          drawerIcon: ({ color }) => <Image source={images.offer} style={{ tintColor: color }} />,
        }}
      />
      <Drawer.Screen
        name="Support"
        component={Home}
        options={{
          drawerIcon: ({ color }) => <Image source={images.offer} style={{ tintColor: color }} />,
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
    marginHorizontal: 10,
    padding: 5,
  },
  drawerImage: {
    height: 48,
    width: 48,
    resizeMode: "contain",
    marginRight: 16,
  },
  drawerHeaderText: {
    fontFamily: typography.poppinsRegular,
    fontSize: 18,
    fontWeight: "bold",
  },

  profilePicture: {
    height: 36,
    width: 36,
    resizeMode: "contain",
  },
  userName: {
    fontFamily: typography.poppinsRegular,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
  },
  userEmail: {
    fontFamily: typography.poppinsRegular,
    fontSize: 14,
    color: colors.white,
  },
  userInfo: {
    padding: 16,
  },
});
