import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "moti";
import { useNavigation } from "@react-navigation/native";
import { useApp } from "@/hooks/useApp";
import { colors } from "@/theme/colors";
import { images } from "@/theme/images";
import { WIDTH } from "@/utils/device";

type Props = {
  label: "Profile" | "None";
};

const _adjustedTop = -80;

const ProfileScreen: React.FC<Props> = ({ label = "Profile" }): JSX.Element => {
  const { state: appState } = useApp();
  const user = appState?.context?.user || {};
  const { username, firstName, id, image } = user;
  const navigation = useNavigation();

  const handleNavigate = (screen: string) => {
    navigation.navigate("PROFILE_CONTAINER", { screen });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.curvedBackground}>
          <View style={styles.profileContainer}>
            <View
              style={{
                borderColor: colors.neutral400,
                borderWidth: 2,
                padding: 5,
                borderRadius: 100,
              }}>
              <Image
                style={[styles.profileImage, { borderRadius: styles.profileImage.width / 2 }]}
                source={image || require("@/assets/bottomTab/profile.png")}
              />
            </View>
            <Text style={styles.name}>{username || "Rakin Afser"}</Text>
            <Text style={styles.membershipLevel}>{firstName || "r.afser01"}</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Member N</Text>
            <Text style={styles.detailsValue}>{id || "15438"}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Member Class</Text>
            <Text style={styles.detailsValue}>Gold</Text>
          </View>
          <TouchableOpacity style={styles.detailsRow} onPress={() => handleNavigate("MEMBER_CARD")}>
            <Text style={styles.detailsLabel}>Member Card</Text>
            <Image style={styles.detailsIcon} source={images.rightArrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={() => handleNavigate("PERSONAL_INFO")}>
            <Image style={styles.sectionItemIcon} source={images.pInfo} />
            <Text style={styles.sectionItemText}>Personal Informations</Text>
            <Image style={styles.detailsIcon} source={images.rightArrow} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={() => handleNavigate("PASSPORT_DETAILS")}>
            <Image style={styles.sectionItemIcon} source={images.pDetails} />
            <Text style={styles.sectionItemText}>Personal Details</Text>
            <Image style={styles.detailsIcon} source={images.rightArrow} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={() => handleNavigate("PAIMENT_METHOD")}>
            <Image style={styles.sectionItemIcon} source={images.pMethods} />
            <Text style={styles.sectionItemText}>Payment Methods</Text>
            <Image style={styles.detailsIcon} source={images.rightArrow} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={() => handleNavigate("FLIGHT_PREFERENCES")}>
            <Image style={styles.sectionItemIcon} source={images.pFlight} />
            <Text style={styles.sectionItemText}>Flight Preferences</Text>
            <Image style={styles.detailsIcon} source={images.rightArrow} />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>General</Text>
          <TouchableOpacity style={styles.sectionItem}>
            <Image style={styles.sectionItemIcon} source={images.pFlight} />
            <Text style={styles.sectionItemText}>Flight Informations</Text>
            <Image style={styles.detailsIcon} source={images.rightArrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem}>
            <Image style={styles.sectionItemIcon} source={images.pReq} />
            <Text style={styles.sectionItemText}>Travel Requirements</Text>
            <Image style={styles.detailsIcon} source={images.rightArrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem}>
            <Image style={styles.sectionItemIcon} source={images.pBag} />
            <Text style={styles.sectionItemText}>Baggages</Text>
            <Image style={styles.detailsIcon} source={images.rightArrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem}>
            <Image style={styles.sectionItemIcon} source={images.pLegal} />
            <Text style={styles.sectionItemText}>Legal</Text>
            <Image style={styles.detailsIcon} source={images.rightArrow} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate("AUTHENTICATING")}>
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
    backgroundColor: colors.white100,
  },
  curvedBackground: {
    backgroundColor: colors.primary700,
    height: 250,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  profileContainer: {
    alignItems: "center",
    backgroundColor: colors.primary700,
    padding: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.blue100,
    padding: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: colors.white,
  },
  membershipLevel: {
    fontSize: 16,
    color: colors.white200,
  },
  detailsContainer: {
    top: _adjustedTop,
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: colors.neutral700,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
  },
  detailsLabel: {
    fontSize: 16,
    color: colors.neutral700,
    fontWeight: "600",
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
    top: _adjustedTop,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: colors.neutral700,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.neutral600,
    marginBottom: 10,
    marginTop: 15,
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
  },
  sectionItemIcon: {
    height: 24,
    width: 24,
    marginRight: 10,
    tintColor: colors.primary700,
    resizeMode: "center",
  },
  sectionItemText: {
    fontSize: 16,
    flex: 1,
  },
  logoutButton: {
    backgroundColor: colors.primary700,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 20,
  },
  logoutButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});
