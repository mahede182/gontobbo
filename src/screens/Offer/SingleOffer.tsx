import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { images } from "@/theme/images";
import { colors } from "@/theme/colors";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const SingleOffer = (props: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.content}>
      <Image source={images.dummyCard} style={styles.image} />
      <Text style={styles.header}>Caesars Palace</Text>
      <Text style={styles.category}>Las Vegas | United States</Text>
      <View style={styles.offerContainer}>
        <Text style={styles.offerTitle}>Offer #1</Text>
        <Text style={styles.offerSubtitle}>Valid for December 24</Text>
        <View style={styles.offerDetails}>
          <Text style={styles.offerValue}>$25 Value</Text>
        </View>
        <View style={styles.offerDetails}>
          <Text style={styles.offerDiscount}>75% Off</Text>
          <Text style={styles.offerPrice}>$10</Text>
        </View>
      </View>
      {/* Add Offer #2 component here */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("TRIP_REVIEW_BOOKING");
          }}
          style={[styles.button, styles.primaryButton]}>
          <Text style={styles.primaryButtonText}>Book Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("WISHLIST");
          }}
          style={[styles.button, styles.secondaryButton]}>
          <Text style={styles.secondaryButtonText}>Add to Wishlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleOffer;

const styles = StyleSheet.create({
  content: {
    paddingVertical: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  category: {
    fontSize: 16,
    color: colors.neutral600,
    marginBottom: 10,
  },
  offerContainer: {
    backgroundColor: colors.white200,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.neutral400,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  offerSubtitle: {
    fontSize: 14,
    color: colors.neutral600,
    marginBottom: 10,
  },
  offerDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  offerValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary700,
    marginRight: 10,
  },
  offerDiscount: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary700,
    marginRight: 10,
  },
  offerPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary700,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  primaryButton: {
    backgroundColor: colors.primary700,
  },
  secondaryButton: {
    backgroundColor: colors.secondary500,
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  secondaryButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});
