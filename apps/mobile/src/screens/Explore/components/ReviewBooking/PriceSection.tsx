import React from "react";
import { StyleSheet } from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { MotiView } from "moti";
import { Divider } from "../../component/Divider";

interface PriceSectionProps {
  roomsCount: number;
  nights: number;
  basePrice: number;
  discount: number;
  taxes: number;
  total: number;
}

const PriceSection: React.FC<PriceSectionProps> = ({
  roomsCount,
  nights,
  basePrice,
  discount,
  taxes,
  total,
}) => {
  const priceAfterDiscount = basePrice - discount;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500, delay: 400 }}
      style={styles.container}>
      <RestyleText style={styles.title}>Price</RestyleText>

      <Box marginVertical="small">
        <Box flexDirection="row" justifyContent="space-between" marginBottom="small">
          <RestyleText style={styles.rowLabel}>
            {roomsCount} Rooms x {nights} Night
          </RestyleText>
          <RestyleText style={styles.rowLabel}>${basePrice}</RestyleText>
        </Box>
        <Box flexDirection="row" justifyContent="space-between" marginBottom="small">
          <RestyleText style={styles.rowLabel}>Base Price</RestyleText>
          <RestyleText style={styles.rowLabel}>${basePrice}</RestyleText>
        </Box>
        <Box flexDirection="row" justifyContent="space-between" marginBottom="small">
          <RestyleText style={styles.discountLabel}>Total Discount</RestyleText>
          <RestyleText style={styles.discountLabel}>${discount}</RestyleText>
        </Box>

        <Divider style={styles.divider} />

        <Box flexDirection="row" justifyContent="space-between" marginBottom="small">
          <RestyleText style={styles.rowLabel}>Price after Discount</RestyleText>
          <RestyleText style={styles.rowLabel}>${priceAfterDiscount}</RestyleText>
        </Box>
        <Box flexDirection="row" justifyContent="space-between" marginBottom="small">
          <RestyleText style={styles.rowLabel}>Taxes & Service Fees</RestyleText>
          <RestyleText style={styles.rowLabel}>${taxes}</RestyleText>
        </Box>

        <Divider style={styles.divider} />

        <Box flexDirection="row" justifyContent="space-between">
          <RestyleText style={styles.totalLabel}>Total Amount to be Paid</RestyleText>
          <RestyleText style={styles.totalValue}>${total}</RestyleText>
        </Box>
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
  title: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 18,
    color: colors.black100,
    marginBottom: 8,
  },
  rowLabel: {
    fontFamily: typography.poppinsRegular,
    fontSize: 14,
    color: colors.neutral600,
  },
  discountLabel: {
    fontFamily: typography.poppinsMedium,
    fontSize: 14,
    color: colors.info,
  },
  divider: {
    marginVertical: 8,
    backgroundColor: colors.neutral100,
  },
  totalLabel: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 15,
    color: colors.black100,
  },
  totalValue: {
    fontFamily: typography.poppinsBold,
    fontSize: 16,
    color: colors.black100,
  },
});

export default PriceSection;
