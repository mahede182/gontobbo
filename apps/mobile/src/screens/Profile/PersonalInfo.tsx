import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "moti";
import { colors } from "@/theme/colors";
import HeaderTitle from "@/components/HeaderTitle";
import { images } from "@/theme/images";

const PersonalInformationScreen: React.FC = () => {
  const personalInfo = [
    { id: 1, label: "First Name", value: "John" },
    { id: 2, label: "Last Name", value: "Doe" },
    { id: 3, label: "Email", value: "john.doe@example.com" },
    { id: 4, label: "Phone Number", value: "+1 123 456 7890" },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderTitle title="Personal Information" />
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Image source={images.profile} style={styles.logo} />
          <View style={styles.memberDetails}>
            {personalInfo.map((item) => (
              <View key={item.id} style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>{item.label}</Text>
                <Text style={styles.detailsValue}>{item.value}</Text>
              </View>
            ))}
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
    backgroundColor: colors.primary100,
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

export default PersonalInformationScreen;
