import { useApp } from "@/hooks/useApp";
import { colors } from "@/theme/colors";
import { images } from "@/theme/images";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "moti";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  label: "Profile" | "None";
};

const ProfileScreen: React.FC<Props> = ({ label = "Profile" }): JSX.Element => {
  const { state: appState } = useApp();
  const user = appState?.context?.user || {};
  const { username, firstName, id, image } = user;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <Image style={styles.profileImage} source={require("@/assets/bottomTab/profile.png")} />
            <Text style={styles.name}>{username || "Rakin Afser"}</Text>
            <Text style={styles.membershipLevel}>{firstName || "r.afser01"}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Member N°</Text>
              <Text style={styles.detailsValue}>{id || "15432"}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Member Class</Text>
              <Text style={styles.detailsValue}>Gold</Text>
            </View>
            <TouchableOpacity
              style={styles.detailsRow}
              onPress={() => {
                navigation.navigate("PROFILE_CONTAINER", { screen: "MEMBER_CARD" });
              }}>
              <Text style={styles.detailsLabel}>Membership Card</Text>
              <Image style={styles.detailsIcon} source={images.rightArrow} />
            </TouchableOpacity>
          </View>
          <View style={styles.sectionsContainer}>
            <Text style={styles.sectionTitle}>PERSONAL DETAILS</Text>
            <TouchableOpacity
              style={styles.sectionItem}
              onPress={() => {
                navigation.navigate("PROFILE_CONTAINER", { screen: "PERSONAL_INFO" });
              }}>
              <Text style={styles.sectionItemText}>Personal informations</Text>
              <Image style={styles.detailsIcon} source={images.rightArrow} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sectionItem}
              onPress={() => {
                navigation.navigate("PROFILE_CONTAINER", { screen: "PASSPORT_DETAILS" });
              }}>
              <Text style={styles.sectionItemText}>Passport details</Text>
              <Image style={styles.detailsIcon} source={images.rightArrow} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sectionItem}
              onPress={() => {
                navigation.navigate("PROFILE_CONTAINER", { screen: "PAIMENT_METHOD" });
              }}>
              <Text style={styles.sectionItemText}>Payment methods</Text>
              <Image style={styles.detailsIcon} source={images.rightArrow} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>Flight preferences</Text>
              <Image style={styles.detailsIcon} source={images.rightArrow} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionTitle}>GENERAL</Text>
          <TouchableOpacity style={styles.sectionItem}>
            <Text style={styles.sectionItemText}>Flight informations</Text>
            <Image style={styles.detailsIcon} source={images.rightArrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem}>
            <Text style={styles.sectionItemText}>Travel requirements</Text>
            <Image style={styles.detailsIcon} source={images.rightArrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem}>
            <Text style={styles.sectionItemText}>Baggages</Text>
            <Image style={styles.detailsIcon} source={images.rightArrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem}>
            <Text style={styles.sectionItemText}>Contact</Text>
            <Image style={styles.detailsIcon} source={images.rightArrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem}>
            <Text style={styles.sectionItemText}>Legal</Text>
            <Image style={styles.detailsIcon} source={images.rightArrow} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            navigation.navigate("AUTHENTICATING");
          }}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    alignItems: "center",
    backgroundColor: colors.secondary400,
    padding: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.blue100,
    padding: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  membershipLevel: {
    fontSize: 16,
    color: colors.neutral700,
  },
  detailsContainer: {
    // backgroundColor: "blue",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  detailsLabel: {
    fontSize: 16,
    color: colors.neutral700,
  },
  detailsValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailsIcon: {
    height: 16,
    width: 16,
    tintColor: colors.primary700,
  },
  sectionsContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    backgroundColor: colors.primary100,
    paddingVertical: 20,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.neutral600,
    marginBottom: 10,
  },
  sectionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionItemText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: colors.primary700,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});
