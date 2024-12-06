import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "moti";
import { colors } from "@/theme/colors";
import HeaderTitle from "@/components/HeaderTitle";
import { images } from "@/theme/images";

const MemberCard: React.FC = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderTitle title="Member Card" />
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Image source={images.profile} style={styles.logo} />
          <View style={styles.memberDetails}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.memberNumber}>Member No: 123456789</Text>
            <Text style={styles.memberClass}>Member Class: Gold</Text>
          </View>
          <View style={styles.barcode}>
            <Image source={images.barCode} style={styles.barcodeImage} />
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
    alignItems: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  memberNumber: {
    fontSize: 18,
    color: colors.neutral700,
    marginBottom: 4,
  },
  memberClass: {
    fontSize: 16,
    color: colors.neutral600,
  },
  barcode: {
    alignItems: "center",
  },
  barcodeImage: {
    width: "100%",
    height: 80,
    resizeMode: "contain",
  },
});

export default MemberCard;
