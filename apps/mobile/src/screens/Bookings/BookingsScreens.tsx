import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { colors } from "@/theme/colors";
import type { Booking } from "@/@types/api.type";
import { Alert } from "react-native";
import HeaderTitle from "@/components/HeaderTitle";
import BookingCard from "./components/BookingCard";
import { useGetBookingsQuery, useCancelBookingMutation } from "@/store/api/bookingsApi";
import BookingFilterTabs, { type BookingTypeFilter } from "./components/BookingFilterTabs";
import BookingEmptyState from "./components/BookingEmptyState";
import Background from "@/components/Background";

const BookingsScreens: React.FC = (): JSX.Element => {
  const [activeFilter, setActiveFilter] = useState<BookingTypeFilter>("ALL");

  const queryParams =
    activeFilter === "ALL" ? undefined : { type: activeFilter as "HOTEL" | "TRIP" };

  const { data: response, isLoading } = useGetBookingsQuery(queryParams);
  const [cancelBooking] = useCancelBookingMutation();
  const bookings = response?.data ?? [];

  const handleCancelPress = useCallback(
    (booking: Booking) => {
      Alert.alert(
        "Cancel Booking",
        "Are you sure you want to cancel this booking?",
        [
          { text: "No", style: "cancel" },
          {
            text: "Yes, Cancel",
            style: "destructive",
            onPress: async () => {
              try {
                await cancelBooking(booking.id).unwrap();
                Alert.alert("Success", "Booking cancelled successfully.");
              } catch {
                Alert.alert("Error", "Failed to cancel booking. Please try again.");
              }
            },
          },
        ],
        { cancelable: true },
      );
    },
    [cancelBooking],
  );

  const handleCardPress = useCallback((_booking: Booking) => {}, []);

  const renderItem = useCallback(
    ({ item }: { item: Booking }) => (
      <BookingCard booking={item} onPress={handleCardPress} onCancel={handleCancelPress} />
    ),
    [handleCardPress, handleCancelPress],
  );

  const keyExtractor = useCallback((item: Booking) => item.id, []);

  return (
    <Background>
      <HeaderTitle title="Bookings" />

      <BookingFilterTabs active={activeFilter} onChange={setActiveFilter} />

      <View style={styles.tabDivider} />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary700} />
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={[styles.listContent, !bookings.length && styles.listEmpty]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<BookingEmptyState />}
        />
      )}
    </Background>
  );
};

export default BookingsScreens;

const styles = StyleSheet.create({
  tabDivider: {
    height: 1,
    backgroundColor: colors.neutral200,
    marginBottom: 12,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    paddingTop: 4,
    paddingBottom: 24,
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  listEmpty: {
    justifyContent: "center",
  },
});
