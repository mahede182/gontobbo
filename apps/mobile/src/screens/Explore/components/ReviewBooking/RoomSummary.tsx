import React from "react";
import { StyleSheet } from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { MotiView } from "moti";

import BulletPoint from "../../component/BulletPoint";
import { Divider } from "../../component/Divider";

interface RoomSummaryProps {
  roomName: string;
  roomsCount: number;
  adults: number;
  amenities: string[];
  isRefundable: boolean;
}

const RoomSummary: React.FC<RoomSummaryProps> = ({
  roomName,
  roomsCount,
  adults,
  amenities,
  isRefundable,
}) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500, delay: 200 }}
      style={styles.container}>
      <RestyleText style={styles.roomTitle}>
        {roomsCount}x {roomName}
      </RestyleText>

      {/* Simulation of per-room guest info like in image */}
      <RestyleText style={styles.roomDetail}>
        {Array.from({ length: roomsCount }).map(
          (_, i) =>
            `Room ${i + 1} : ${Math.ceil(adults / roomsCount)} Adult${i < roomsCount - 1 ? " ● " : ""}`,
        )}
      </RestyleText>

      <Box marginVertical="small">
        {amenities.map((item, index) => (
          <BulletPoint key={index} text={item} />
        ))}
      </Box>

      <Divider style={styles.divider} />

      <RestyleText style={styles.policyTitle}>
        {isRefundable ? "Refundable" : "Non-Refundable"}
      </RestyleText>
      <RestyleText style={styles.policyDesc}>
        {isRefundable
          ? "Refund is applicable based on hotel policy."
          : "Refund is not applicable for this booking"}
      </RestyleText>
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
  roomTitle: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 18,
    color: colors.black100,
    marginBottom: 4,
  },
  roomDetail: {
    fontFamily: typography.poppinsMedium,
    fontSize: 13,
    color: colors.neutral600,
    marginBottom: 8,
  },
  divider: {
    marginVertical: 12,
    backgroundColor: colors.neutral100,
  },
  policyTitle: {
    fontFamily: typography.poppinsMedium,
    fontSize: 14,
    color: colors.neutral700,
    marginBottom: 4,
  },
  policyDesc: {
    fontFamily: typography.poppinsRegular,
    fontSize: 12,
    color: colors.neutral500,
  },
});

export default RoomSummary;
