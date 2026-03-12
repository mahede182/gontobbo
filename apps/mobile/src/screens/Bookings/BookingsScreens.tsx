import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@/theme/colors";
import type { Booking } from "@/@types/api.type";
import { Alert } from "react-native";
import HeaderTitle from "@/components/HeaderTitle";
import BookingCard from "./components/BookingCard";
import { useGetBookingsQuery, useCancelBookingMutation } from "@/store/api/bookingsApi";
import BookingFilterTabs, { type BookingTypeFilter } from "./components/BookingFilterTabs";
import BookingEmptyState from "./components/BookingEmptyState";

const BookingsScreens: React.FC = (): JSX.Element => {
  const navigation = useNavigation<any>();
  const [activeFilter, setActiveFilter] = useState<BookingTypeFilter>("ALL");

  const queryParams =
    activeFilter === "ALL" ? undefined : { type: activeFilter as "HOTEL" | "TRIP" };

  const { data: response, isLoading, isFetching } = useGetBookingsQuery(queryParams);
  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
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
              } catch (error) {
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

  const handleCardPress = useCallback((booking: Booking) => {}, []);

  const renderItem = useCallback(
    ({ item }: { item: Booking }) => (
      <BookingCard booking={item} onPress={handleCardPress} onCancel={handleCancelPress} />
    ),
    [handleCardPress, handleCancelPress],
  );

  const keyExtractor = useCallback((item: Booking) => item.id, []);

  return (
    <SafeAreaView style={styles.container}>
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
          ItemSeparatorComponent={null}
        />
      )}
    </SafeAreaView>
  );
};

export default BookingsScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.neutral700,
    flex: 1,
  },
  spinner: {
    marginLeft: 8,
  },
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
