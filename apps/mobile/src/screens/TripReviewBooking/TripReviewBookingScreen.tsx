import HeaderTitle from "@/components/HeaderTitle";
import { colors } from "@/theme/colors";
import { images } from "@/theme/images";
import { dynamicCSS } from "@/utils/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { getTripDetail, Trip } from "@/api/trips";

type Props = {};

const TripReviewBookingScreen = (props: Props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { tripId } = (route.params as { tripId?: string }) || {};
  const [trip, setTrip] = React.useState<Trip | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTrip = async () => {
      try {
        if (tripId) {
          const data = await getTripDetail(tripId);
          setTrip(data);
        }
      } catch (error) {
        console.error("Error fetching trip:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [tripId]);

  if (loading) {
    return (
      <SafeAreaView
        style={[dynamicCSS("flex", 1), { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary700} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={dynamicCSS("flex", 1)}>
      <HeaderTitle title="Review Booking" />
      <ScrollView style={styles.container}>
        <View style={styles.hotelContainer}>
          <Image
            source={trip?.image ? { uri: trip.image } : images.dummyCard}
            style={styles.hotelImage}
          />
          <View style={styles.hotelDetails}>
            <Text style={styles.hotelName}>{trip?.title ?? "Trip"}</Text>
            <Text style={styles.hotelPackage}>Tour Package</Text>
            <Text style={styles.hotelRating}>★★★★★</Text>
            <Text style={styles.hotelLocation}>{trip?.destination ?? ""}</Text>
          </View>
        </View>

        <View style={styles.datesContainer}>
          <Text style={styles.checkInDate}>Duration: {trip?.duration ?? "N/A"}</Text>
          <Text style={styles.guestsCount}>2 Adults + 1 Children</Text>
        </View>

        <View style={styles.packageContainer}>
          <Text style={styles.packageTitle}>{trip?.title ?? "Trip Package"}</Text>
          <Text style={styles.packageDuration}>Duration: {trip?.duration ?? "N/A"}</Text>
          <View style={styles.packageDetails}>
            {trip?.packageDetails?.map((detail) => (
              <Text key={detail.id} style={styles.packageDetail}>
                • {detail.detail}
              </Text>
            ))}
          </View>
          <Text style={styles.packageNonRefundable}>
            {trip?.isRefundable ? "Refundable" : "Non-Refundable"}
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceTitle}>Price</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>{trip?.title ?? "Trip Package"}</Text>
            <Text style={styles.priceValue}>${trip?.price ?? 0}</Text>
          </View>
          <View style={styles.totalPriceRow}>
            <Text style={styles.totalPriceLabel}>Total Amount to be Paid</Text>
            <Text style={styles.totalPriceValue}>${trip?.price ?? 0}</Text>
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ADD_TRAVELLER");
            }}
            style={styles.travellerDetailsRow}>
            <Text style={styles.travellerDetailsText}>Add Traveller 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ADD_TRAVELLER");
            }}
            style={styles.travellerDetailsRow}>
            <Text style={styles.travellerDetailsText}>Add Traveller 3</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Contact Information</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactLabel}>Email Address</Text>
            <TextInput placeholder="Email Address" />
          </View>
          <View style={styles.contactRow}>
            <Text style={styles.contactLabel}>Current Address</Text>
            <TextInput placeholder="Current Address" />
          </View>
          <View style={styles.contactRow}>
            <Text style={styles.contactLabel}>Contact Number</Text>
            <View style={styles.contactNumberRow}>
              <Text>+1</Text>
              <TextInput placeholder="Contact No." />
            </View>
          </View>
          {/* <View style={styles.stateRow}>
            <Text style={styles.stateLabel}>Your State</Text>
            <TouchableOpacity style={styles.stateButton}>
              <Text style={styles.stateButtonText}>Edit</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.stateRow}>
            <Text style={styles.stateValue}>USA / Outside USA</Text>
            <Text style={styles.stateCheckbox}>✓</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.bookNowButton}
          onPress={() => navigation.navigate("BOOKING_SUCCESS")}>
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
    color: colors.neutral700,
  },
  hotelRating: {
    fontSize: 16,
    color: colors.linearEnd,
  },
  hotelLocation: {
    fontSize: 14,
    color: colors.neutral700,
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
    backgroundColor: colors.white200,
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
    color: colors.neutral700,
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
    color: colors.neutral700,
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
    color: colors.neutral700,
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
    backgroundColor: colors.white200,
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
    color: colors.neutral700,
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
  stateValue: {
    fontSize: 16,
  },
  stateCheckbox: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.blue600,
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
    color: colors.white,
  },
});
