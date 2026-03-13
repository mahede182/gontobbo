/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderTitle from "@/components/HeaderTitle";
import { useGetHotelDetailQuery, type Room } from "@/store/api/hotelsApi";
import { useCreateBookingMutation } from "@/store/api/bookingsApi";
import PriceSelect from "./component/PriceSelect";

// Refactored Components
import HotelHeader from "./components/ReviewBooking/HotelHeader";
import BookingDates from "./components/ReviewBooking/BookingDates";
import RoomSummary from "./components/ReviewBooking/RoomSummary";
import RulesSection from "./components/ReviewBooking/RulesSection";
import PriceSection from "./components/ReviewBooking/PriceSection";
import GuestForm from "./components/ReviewBooking/GuestForm";
import StateSection from "./components/ReviewBooking/StateSection";
import AddGuestModal from "./components/ReviewBooking/AddGuestModal";

const ReviewBooking = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const params =
    (route.params as {
      hotelId: string;
      roomId?: string;
      checkIn?: string;
      checkOut?: string;
      guests?: number;
      adults?: number;
      rooms?: number;
    }) || {};

  const { hotelId, roomId, checkIn, checkOut, adults, rooms, guests } = params;

  // Use guests as adults if adults not provided (common in different API versions)
  const adultsCount = adults ?? guests ?? 2;
  const roomsCount = rooms ?? 1;

  const { data: hotel, isLoading } = useGetHotelDetailQuery(hotelId, {
    skip: !hotelId,
  });

  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();

  const room: Room | null = React.useMemo(() => {
    if (!hotel?.rooms?.length) return null;
    if (roomId) {
      const found = hotel.rooms.find((r: Room) => r.id === roomId);
      return found ?? hotel.rooms[0] ?? null;
    }
    return hotel.rooms[0];
  }, [hotel, roomId]);

  const [isGuestModalVisible, setIsGuestModalVisible] = useState(false);
  const [isEditStateVisible, setIsEditStateVisible] = useState(false);
  const [bookingFor, setBookingFor] = useState<"MYSELF" | "SOMEONE_ELSE">("MYSELF");
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isSavedToProfile, setIsSavedToProfile] = useState(true);

  // Default dates
  const checkInDate = checkIn || new Date().toISOString();
  const checkOutDate = checkOut || new Date(Date.now() + 86400000).toISOString();
  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24),
    ),
  );

  const handleBookNow = async () => {
    try {
      await createBooking({
        type: "HOTEL",
        hotelId,
        roomId: room?.id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        adults: adultsCount,
        rooms: roomsCount,
        bookingFor,
        guestTitle: title || undefined,
        guestFirstName: firstName || undefined,
        guestLastName: lastName || undefined,
        guestEmail: email || undefined,
        guestPhone: phone || undefined,
        guestAddress: address || undefined,
        guestState: "USA", // Default or from state section
      }).unwrap();
      navigation.navigate("BOOKING_SUCCESS");
    } catch (error) {
      Alert.alert("Error", "Failed to create booking. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary700} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitle title="Review Booking" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <HotelHeader
          name={hotel?.name ?? "Hotel"}
          starRating={hotel?.starRating ?? 0}
          location={hotel?.location ?? ""}
          image={hotel?.images?.[0]}
        />

        <BookingDates
          checkIn={checkInDate}
          checkOut={checkOutDate}
          nights={nights}
          adults={adultsCount}
          roomsCount={roomsCount}
        />

        <RoomSummary
          roomName={room?.name ?? "Standard Room"}
          roomsCount={roomsCount}
          adults={adultsCount}
          amenities={room?.amenities ?? ["Free Wifi", "Breakfast"]}
          isRefundable={room?.isRefundable ?? false}
        />

        <RulesSection onViewAll={() => navigation.navigate("RULES_AND_REGULATIONS")} />

        <PriceSection
          roomsCount={roomsCount}
          nights={nights}
          basePrice={(room?.price ?? 0) * roomsCount * nights}
          discount={15} // Mock discount
          taxes={20} // Mock taxes
          total={(room?.price ?? 0) * roomsCount * nights - 15 + 20}
        />

        <GuestForm
          bookingFor={bookingFor}
          setBookingFor={setBookingFor}
          title={title}
          setTitle={setTitle}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          address={address}
          setAddress={setAddress}
          phone={phone}
          setPhone={setPhone}
          onAddNewGuest={() => setIsGuestModalVisible(true)}
        />

        <StateSection
          stateValue="USA / Outside USA"
          isSavedToProfile={isSavedToProfile}
          onToggleSave={() => setIsSavedToProfile(!isSavedToProfile)}
          onEdit={() => setIsEditStateVisible(true)}
        />
      </ScrollView>

      <PriceSelect
        price={(room?.price ?? 0) * roomsCount * nights - 15 + 20}
        gradient
        type="booking"
        buttonText={isBooking ? "Processing..." : "Book Now"}
        priceSub={`+$45 taxes & fees, ${nights} Nights for ${roomsCount} Room`}
        onPress={handleBookNow}
        disabled={isBooking}
      />

      <AddGuestModal
        visible={isGuestModalVisible}
        onClose={() => setIsGuestModalVisible(false)}
        onSave={() => setIsGuestModalVisible(false)}
        title={title}
        setTitle={setTitle}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
});

export default ReviewBooking;
