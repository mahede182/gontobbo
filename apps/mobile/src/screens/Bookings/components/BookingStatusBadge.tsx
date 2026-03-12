import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme/colors";
import type { Booking } from "@/@types/api.type";

type Status = Booking["status"];

const STATUS_CONFIG: Record<Status, { label: string; bg: string; text: string }> = {
  PENDING: { label: "Pending", bg: colors.warning + "25", text: colors.warning },
  CONFIRMED: { label: "Confirmed", bg: colors.success + "25", text: colors.success },
  CANCELLED: { label: "Cancelled", bg: colors.danger + "25", text: colors.danger },
  COMPLETED: { label: "Completed", bg: colors.primary600 + "25", text: colors.primary600 },
};

interface Props {
  status: Status;
}

const BookingStatusBadge: React.FC<Props> = ({ status }) => {
  const config = STATUS_CONFIG[status];
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <View style={[styles.dot, { backgroundColor: config.text }]} />
      <Text style={[styles.label, { color: config.text }]}>{config.label}</Text>
    </View>
  );
};

export default BookingStatusBadge;

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});
