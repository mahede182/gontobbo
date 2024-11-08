import { useApp } from "@/hooks/useApp";
import { colors } from "@/theme/colors";
import { SafeAreaView } from "moti";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  label: "Profile" | "None";
};

const ProfileScreen: React.FC<Props> = ({ label = "Profile" }): JSX.Element => {
  const { state: appState } = useApp();
  const { username, firstName, id, image } = appState?.context?.user;

  // const userData = {
  //   name: "Anais Fourati",
  //   membershipLevel: "Gold Member",
  //   memberNumber: "477 833 9222 922",
  //   milesCollected: 14934,
  //   memberClass: "Gold",
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: image }} style={styles.profileImage} />
            <Text style={styles.name}>{username}</Text>
            <Text style={styles.membershipLevel}>{firstName}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Member N°</Text>
              <Text style={styles.detailsValue}>{id}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Member Class</Text>
              <Text style={styles.detailsValue}>Gold</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Membership Card</Text>
              <Text style={styles.detailsValue}>{">"}</Text>
            </View>
          </View>
          <View style={styles.sectionsContainer}>
            <Text style={styles.sectionTitle}>PERSONAL DETAILS</Text>
            <TouchableOpacity style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>Personal informations</Text>
              <Text style={styles.sectionItemArrow}>{">"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>Passport details</Text>
              <Text style={styles.sectionItemArrow}>{">"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>Payment methods</Text>
              <Text style={styles.sectionItemArrow}>{">"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>Flight preferences</Text>
              <Text style={styles.sectionItemArrow}>{">"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionTitle}>GENERAL</Text>
          <TouchableOpacity style={styles.sectionItem}>
            <Text style={styles.sectionItemText}>Flight informations</Text>
            <Text style={styles.sectionItemArrow}>{">"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem}>
            <Text style={styles.sectionItemText}>Travel requirements</Text>
            <Text style={styles.sectionItemArrow}>{">"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem}>
            <Text style={styles.sectionItemText}>Baggages</Text>
            <Text style={styles.sectionItemArrow}>{">"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem}>
            <Text style={styles.sectionItemText}>Contact</Text>
            <Text style={styles.sectionItemArrow}>{">"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem}>
            <Text style={styles.sectionItemText}>Legal</Text>
            <Text style={styles.sectionItemArrow}>{">"}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton}>
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
    backgroundColor: colors.blue200,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  membershipLevel: {
    fontSize: 16,
    color: colors.neutral400,
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailsLabel: {
    fontSize: 16,
    color: colors.neutral400,
  },
  detailsValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.neutral400,
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
  sectionItemArrow: {
    fontSize: 16,
    color: colors.neutral400,
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
