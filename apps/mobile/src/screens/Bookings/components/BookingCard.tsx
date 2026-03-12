import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import { colors } from "@/theme/colors";
import { images } from "@/theme/images";
import type { Booking } from "@/@types/api.type";
import BookingStatusBadge from "./BookingStatusBadge";

// ─── Helpers ───────────────────────────────────────────────────────────────────

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

const getImageUri = (booking: Booking): string | null => {
  if (booking.type === "HOTEL") return booking.hotel?.images?.[0] ?? null;
  return booking.trip?.image ?? null;
};

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  booking: Booking & { _count?: { travellers: number } };
  onPress?: (booking: Booking) => void;
}

const BookingCard: React.FC<Props> = ({ booking, onPress }) => {
  const imageUri = getImageUri(booking);
  const name = booking.type === "HOTEL" ? booking.hotel?.name : booking.trip?.title;
  const location = booking.type === "HOTEL" ? booking.hotel?.location : booking.trip?.destination;
  const subTitle = booking.type === "HOTEL" ? booking.room?.name : "Tour Package";
  const travellerCount = (booking as any)._count?.travellers ?? 0;

  return (
    <TouchableOpacity activeOpacity={0.88} style={styles.card} onPress={() => onPress?.(booking)}>
      {/* ── Image ── */}
      <Image
        source={imageUri ? { uri: imageUri } : images.dummyCard}
        style={styles.image}
        resizeMode="cover"
      />

      {/* ── Content ── */}
      <View style={styles.content}>
        {/* Name + Status */}
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {name ?? "Booking"}
          </Text>
          <BookingStatusBadge status={booking.status} />
        </View>

        {/* Location */}
        {location ? (
          <View style={styles.metaRow}>
            <Icon name="map-marker-alt" size={11} color={colors.neutral500} />
            <Text style={styles.metaText} numberOfLines={1}>
              {location}
            </Text>
          </View>
        ) : null}

        {/* Room / type label */}
        {subTitle ? (
          <Text style={styles.subTitle} numberOfLines={1}>
            {subTitle}
          </Text>
        ) : null}

        {/* Dates */}
        <View style={styles.metaRow}>
          <Icon name="calendar-alt" size={11} color={colors.neutral500} />
          <Text style={styles.metaText}>
            {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}
          </Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Footer: travellers + price */}
        <View style={styles.footer}>
          <View style={styles.metaRow}>
            <Icon name="user-friends" size={11} color={colors.neutral500} />
            <Text style={styles.metaText}>
              {booking.adults} Adult{booking.adults !== 1 ? "s" : ""}
              {booking.children > 0 ? `, ${booking.children} Child` : ""}
              {travellerCount > 0
                ? ` · ${travellerCount} Traveller${travellerCount !== 1 ? "s" : ""}`
                : ""}
            </Text>
          </View>
          <Text style={styles.price}>${booking.totalPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(BookingCard);

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.neutral200,
    overflow: "hidden",
    // iOS shadow
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    // Android shadow
    elevation: 2,
  },
  image: {
    width: 90,
    height: "100%" as any,
    minHeight: 120,
  },
  content: {
    flex: 1,
    padding: 12,
    gap: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 2,
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: colors.neutral700,
  },
  subTitle: {
    fontSize: 12,
    color: colors.primary600,
    fontWeight: "500",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  metaText: {
    fontSize: 11,
    color: colors.neutral500,
    flexShrink: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral200,
    marginVertical: 6,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary700,
  },
});
