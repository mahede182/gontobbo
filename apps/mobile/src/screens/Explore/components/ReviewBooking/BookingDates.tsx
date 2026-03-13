import React from "react";
import { StyleSheet } from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { MotiView } from "moti";
import { Divider } from "../../component/Divider";

interface BookingDatesProps {
  checkIn: string;
  checkOut: string;
  adults: number;
  roomsCount: number;
  nights: number;
}

const BookingDates: React.FC<BookingDatesProps> = ({
  checkIn,
  checkOut,
  adults,
  roomsCount,
  nights,
}) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      weekday: "short",
    });
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500, delay: 100 }}
      style={styles.container}>
      <Box flexDirection="row" alignItems="center" justifyContent="space-between">
        <Box>
          <RestyleText style={styles.label}>Check In</RestyleText>
          <RestyleText style={styles.date}>{formatDate(checkIn)}</RestyleText>
          <RestyleText style={styles.time}>3:00 PM</RestyleText>
        </Box>

        <Box style={styles.nightsContainer}>
          <RestyleText style={styles.nightsText}>{nights} Night</RestyleText>
        </Box>

        <Box alignItems="flex-end">
          <RestyleText style={styles.label}>Check Out</RestyleText>
          <RestyleText style={styles.date}>{formatDate(checkOut)}</RestyleText>
          <RestyleText style={styles.time}>12:00 PM</RestyleText>
        </Box>
      </Box>

      <Divider style={styles.divider} />

      <Box>
        <RestyleText style={styles.label}>Guests & Rooms</RestyleText>
        <RestyleText style={styles.guestInfo}>
          {adults} Adults ● {roomsCount} Rooms
        </RestyleText>
      </Box>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.white100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.neutral200,
    marginBottom: 16,
  },
  label: {
    fontFamily: typography.poppinsRegular,
    fontSize: 12,
    color: colors.neutral500,
    marginBottom: 4,
  },
  date: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 14,
    color: colors.black100,
  },
  time: {
    fontFamily: typography.poppinsRegular,
    fontSize: 11,
    color: colors.neutral400,
  },
  nightsContainer: {
    backgroundColor: colors.primary50,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  nightsText: {
    fontFamily: typography.poppinsMedium,
    fontSize: 12,
    color: colors.primary700,
  },
  divider: {
    marginVertical: 12,
    backgroundColor: colors.neutral100,
  },
  guestInfo: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 14,
    color: colors.black100,
  },
});

export default BookingDates;
