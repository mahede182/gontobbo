import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { images } from "@/theme/images";
import { colors } from "@/theme/colors";
import { useNavigation } from "@react-navigation/native";
import { getItem, saveItem } from "@/utils/storage";

type Props = {
  offer: {
    id: number;
    name: string;
    location: string;
    image: any;
    offer1: {
      title: string;
      subtitle: string;
      value: string;
      discount: string;
      price: string;
    };
    offer2: {
      title: string;
      subtitle: string;
      value: string;
      discount: string;
      price: string;
    };
  };
};

const SingleOffer = ({ offer }: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.content}>
      <Image source={offer.image} style={styles.image} />
      <Text style={styles.header}>{offer.name}</Text>
      <Text style={styles.category}>{offer.location}</Text>
      <View style={styles.offerContainer}>
        <Text style={styles.offerTitle}>{offer.offer1.title}</Text>
        <Text style={styles.offerSubtitle}>{offer.offer1.subtitle}</Text>
        <View style={styles.offerDetails}>
          <Text style={styles.offerValue}>{offer.offer1.value}</Text>
        </View>
        <View style={styles.offerDetails}>
          <Text style={styles.offerDiscount}>{offer.offer1.discount}</Text>
          <Text style={styles.offerPrice}>{offer.offer1.price}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("TRIP_REVIEW_BOOKING");
          }}
          style={[styles.button, styles.primaryButton]}>
          <Text style={styles.primaryButtonText}>Book Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            try {
              const wishlistJson = await getItem("wishlist");
              const wishlist = wishlistJson ? wishlistJson : [];
              const isOfferInWishlist = wishlist.some(
                (item: { itemId: string }) => item.itemId === offer.itemId,
              );

              if (!isOfferInWishlist) {
                const updatedWishlist = [...wishlist, offer];
                await saveItem("wishlist", updatedWishlist);
                alert("Offer added to wishlist!");
              } else {
                alert("Offer is already in your wishlist.");
              }
            } catch (error) {
              console.error("Error handling wishlist:", error);
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
