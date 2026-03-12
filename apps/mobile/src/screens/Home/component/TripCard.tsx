import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface TripCardProps {
  id: string;
  image: string;
  title: string;
  duration: string;
  feature: string;
  peopleJoined: number;
}

const AVATAR_PLACEHOLDER = [colors.secondary400, colors.primary400, colors.blue400, colors.warning];

const TripCard: React.FC<TripCardProps> = React.memo(
  ({ id, image, title, duration, feature, peopleJoined }) => {
    const navigation = useNavigation();
    return (
      <Pressable
        onPress={() => (navigation as any).navigate("TRIP_REVIEW_BOOKING", { tripId: id })}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
        <Image
          source={image ? { uri: image } : require("@/assets/hotel_image_1.png")}
          style={styles.image}
        />
        <Box style={styles.content}>
          <RestyleText style={styles.title} numberOfLines={2}>
            {title}
          </RestyleText>
          <Box style={styles.metaRow}>
            <Ionicons name="sunny-outline" size={14} color={colors.gray} />
            <RestyleText style={styles.metaText} numberOfLines={1}>
              {duration}
            </RestyleText>
            <Ionicons name="airplane-outline" size={14} color={colors.gray} />
            <RestyleText style={styles.metaText} numberOfLines={1}>
              {feature}
            </RestyleText>
          </Box>
          <Box style={styles.joinedRow}>
            <Box style={styles.avatarStack}>
              {AVATAR_PLACEHOLDER.map((bg, i) => (
                <View key={i} style={[styles.avatar, { backgroundColor: bg, left: i * 16 }]} />
              ))}
            </Box>
            <RestyleText style={styles.joinedText}>{peopleJoined}+ People Joined</RestyleText>
          </Box>
        </Box>
      </Pressable>
    );
  },
);

TripCard.displayName = "TripCard";

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: "38%",
    height: 140,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 16,
    color: colors.neutral700,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  metaText: {
    fontFamily: typography.poppinsRegular,
    fontSize: 12,
    color: colors.gray,
    marginRight: 8,
  },
  joinedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  avatarStack: {
    flexDirection: "row",
    width: 16 * 3 + 24, // 3 overlaps + last full
    height: 24,
    marginRight: 8,
  },
  avatar: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.white,
  },
  joinedText: {
    fontFamily: typography.poppinsRegular,
    fontSize: 12,
    color: colors.gray,
  },
});

export default TripCard;
