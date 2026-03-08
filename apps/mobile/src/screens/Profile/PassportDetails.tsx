import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "moti";
import { colors } from "@/theme/colors";
import HeaderTitle from "@/components/HeaderTitle";
import { images } from "@/theme/images";

const PassportDetailsScreen: React.FC = () => {
  const passportDetails = {
    fullName: "John Doe",
    passportNumber: "ABC123456",
    nationality: "United States",
    dateOfBirth: "01/01/1990",
    dateOfIssue: "01/01/2020",
    dateOfExpiry: "01/01/2030",
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderTitle title="Passport Details" />
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Image source={images.passport} style={styles.logo} />
          <View style={styles.memberDetails}>
            <Text style={styles.name}>{passportDetails.fullName}</Text>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Passport Number</Text>
              <Text style={styles.detailsValue}>{passportDetails.passportNumber}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Nationality</Text>
              <Text style={styles.detailsValue}>{passportDetails.nationality}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Date of Birth</Text>
              <Text style={styles.detailsValue}>{passportDetails.dateOfBirth}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Date of Issue</Text>
              <Text style={styles.detailsValue}>{passportDetails.dateOfIssue}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Date of Expiry</Text>
              <Text style={styles.detailsValue}>{passportDetails.dateOfExpiry}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  container: {
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral100,
  },
  cardContainer: {
    backgroundColor: colors.secondary100,
    borderRadius: 8,
    padding: 16,
    width: "80%",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 16,
  },
  memberDetails: {
    alignItems: "flex-start",
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    width: "100%",
  },
  detailsLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.neutral500,
  },
  detailsValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.neutral600,
  },
});

export default PassportDetailsScreen;
