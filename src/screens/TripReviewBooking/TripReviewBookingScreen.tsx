import HeaderTitle from "@/components/HeaderTitle";
import { colors } from "@/theme/colors";
import { images } from "@/theme/images";
import { dynamicCSS } from "@/utils/styles";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

type Props = {};

const TripReviewBookingScreen = (props: Props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={dynamicCSS("flex", 1)}>
      <HeaderTitle title="Review Booking" />
      <ScrollView style={styles.container}>
        <View style={styles.hotelContainer}>
          <Image source={images.dummyCard} style={styles.hotelImage} />
          <View style={styles.hotelDetails}>
            <Text style={styles.hotelName}>Buckingham Palace, London</Text>
            <Text style={styles.hotelPackage}>Tour Package</Text>
            <Text style={styles.hotelRating}>★★★★★</Text>
            <Text style={styles.hotelLocation}>
              Heathrow Airport Limited, The Compass Centre, Nelson Road, Hounslow, Middlesex, TW6
              2GW
            </Text>
          </View>
        </View>

        <View style={styles.datesContainer}>
          <Text style={styles.checkInDate}>10 Nov, 2025, 2:00 PM</Text>
          <Text style={styles.checkOutDate}>15 Nov, 2025, 12:00 PM</Text>
          <Text style={styles.guestsCount}>2 Adults + 1 Children</Text>
        </View>

        <View style={styles.packageContainer}>
          <Text style={styles.packageTitle}>5 Days 4 Nights Trip Package</Text>
          <Text style={styles.packageDuration}>Duration: 5 days</Text>
          <View style={styles.packageDetails}>
            <Text style={styles.packageDetail}>• Breakfast (Non-Refundable)</Text>
            <Text style={styles.packageDetail}>• Free Parking</Text>
            <Text style={styles.packageDetail}>• Free WiFi</Text>
            <Text style={styles.packageDetail}>• Free Breakfast</Text>
            <Text style={styles.packageDetail}>• Flight Included</Text>
          </View>
          <Text style={styles.packageNonRefundable}>Non-Refundable</Text>
          <Text style={styles.packageNonRefundable}>Refund is not applicable for this booking</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceTitle}>Price</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>5 Days 4 Nights Trip Package</Text>
            <Text style={styles.priceValue}>$475</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Total Discount</Text>
            <Text style={styles.priceValue}>$0</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Price after Discount</Text>
            <Text style={styles.priceValue}>$475</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Flight Fee</Text>
            <Text style={styles.priceValue}>$1400</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Taxes & Service Fee</Text>
            <Text style={styles.priceValue}>$5</Text>
          </View>
          <View style={styles.totalPriceRow}>
            <Text style={styles.totalPriceLabel}>Total Amount to be Paid</Text>
            <Text style={styles.totalPriceValue}>$1,880</Text>
          </View>
        </View>

        <View style={styles.travellerDetailsContainer}>
          <Text style={styles.travellerDetailsTitle}>Traveller Details</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ADD_TRAVELLER");
            }}
            style={styles.travellerDetailsRow}>
            <Text style={styles.travellerDetailsText}>Add Traveller 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.travellerDetailsRow}>
            <Text style={styles.travellerDetailsText}>Add Traveller 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.travellerDetailsRow}>
            <Text style={styles.travellerDetailsText}>Add Traveller 3</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Contact Information</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactLabel}>Email Address</Text>
            <Text style={styles.contactPlaceholder}>Email Address</Text>
          </View>
          <View style={styles.contactRow}>
            <Text style={styles.contactLabel}>Current Address</Text>
            <Text style={styles.contactPlaceholder}>Current Address</Text>
          </View>
          <View style={styles.contactRow}>
            <Text style={styles.contactLabel}>Contact Number</Text>
            <View style={styles.contactNumberRow}>
              <Text>+1</Text>
              <Text style={styles.contactPlaceholder}>Contact No.</Text>
            </View>
          </View>
          <View style={styles.stateRow}>
            <Text style={styles.stateLabel}>Your State</Text>
            <TouchableOpacity style={styles.stateButton}>
              <Text style={styles.stateButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.stateRow}>
            <Text style={styles.stateValue}>USA / Outside USA</Text>
            <Text style={styles.stateCheckbox}>✓</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.bookNowButton}>
          <Text style={styles.bookNowButtonText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TripReviewBookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  hotelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  hotelImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  hotelDetails: {
    flex: 1,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  hotelPackage: {
    fontSize: 16,
    color: "#888",
  },
  hotelRating: {
    fontSize: 16,
    color: "#ffa500",
  },
  hotelLocation: {
    fontSize: 14,
    color: "#888",
  },
  datesContainer: {
    marginBottom: 16,
  },
  checkInDate: {
    fontSize: 16,
    fontWeight: "bold",
  },
  checkOutDate: {
    fontSize: 16,
    fontWeight: "bold",
  },
  guestsCount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  packageContainer: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  packageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  packageDuration: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  packageDetails: {
    marginBottom: 8,
  },
  packageDetail: {
    fontSize: 16,
    marginBottom: 4,
  },
  packageNonRefundable: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff0000",
  },
  priceContainer: {
    marginBottom: 16,
  },
  priceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  priceLabel: {
    fontSize: 16,
    color: "#888",
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  totalPriceLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPriceValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  travellerDetailsContainer: {
    marginBottom: 16,
  },
  travellerDetailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  travellerDetailsRow: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  travellerDetailsText: {
    fontSize: 16,
  },
  contactContainer: {
    marginBottom: 16,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  contactLabel: {
    fontSize: 16,
    color: "#888",
  },
  contactPlaceholder: {
    fontSize: 16,
    color: "#888",
  },
  contactNumberRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  stateLabel: {
    fontSize: 16,
    color: "#888",
  },
  stateButton: {
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 8,
  },
  stateButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stateValue: {
    fontSize: 16,
  },
  stateCheckbox: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00ff00",
  },
  bookNowButton: {
    backgroundColor: colors.primary700,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  bookNowButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
