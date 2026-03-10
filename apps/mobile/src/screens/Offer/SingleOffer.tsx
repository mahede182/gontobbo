import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { images } from "@/theme/images";
import { colors } from "@/theme/colors";
import { useNavigation } from "@react-navigation/native";
import { Offer } from "@/api/offers";
import { addToWishlist } from "@/api/wishlist";

type Props = {
  offer: Offer;
};

const SingleOffer = ({ offer }: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.content}>
      <Image source={offer.image ? { uri: offer.image } : images.dummyCard} style={styles.image} />
      <Text style={styles.header}>{offer.name}</Text>
      <Text style={styles.category}>{offer.location}</Text>
      <View style={styles.offerContainer}>
        <Text style={styles.offerTitle}>{offer.tier1Title}</Text>
        <Text style={styles.offerSubtitle}>{offer.tier1Subtitle}</Text>
        <View style={styles.offerDetails}>
          <Text style={styles.offerValue}>{offer.tier1Value}</Text>
        </View>
        <View style={styles.offerDetails}>
          <Text style={styles.offerDiscount}>{offer.tier1Discount}% Off</Text>
          <Text style={styles.offerPrice}>${offer.tier1Price}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {offer.hotelId && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("HOTEL_DETAIL", { hotelId: offer.hotelId });
            }}
            style={[styles.button, styles.primaryButton]}>
            <Text style={styles.primaryButtonText}>Book Now</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={async () => {
            try {
              await addToWishlist({
                offerId: offer.id,
                type: "HOTEL",
                name: offer.name,
              });
              Alert.alert("Success", "Offer added to wishlist!");
            } catch (error) {
              Alert.alert("Info", "Offer may already be in your wishlist.");
            }
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
