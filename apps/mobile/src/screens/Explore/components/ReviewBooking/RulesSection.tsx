import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { MotiView } from "moti";
import BulletPoint from "../../component/BulletPoint";

interface RulesSectionProps {
  onViewAll?: () => void;
}

const RulesSection: React.FC<RulesSectionProps> = ({ onViewAll }) => {
  const rules = [
    "Pets not allowed",
    "Guests are provided with free hand sanitizer. Protective clothing is available to guests. Masks are available to guests.",
    "This hotel offers transfers from this airport (surcharges may apply). Guests must contact the hotel with arrival details before travel, using the contact information on the booking confirmation. Front desk staff will greet guests on arrival.",
    "Optional : Fee for the buffet breakfast: approximately $20 and $14 for children | Airport shuttle fee : $10 per person (one-way)",
  ];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500, delay: 300 }}
      style={styles.container}>
      <RestyleText style={styles.title}>Rules & Regulation</RestyleText>

      <Box marginVertical="small">
        {rules.map((rule, index) => (
          <BulletPoint key={index} text={rule} spacing={12} />
        ))}
      </Box>

      <TouchableOpacity onPress={onViewAll}>
        <RestyleText style={styles.viewAll}>View All</RestyleText>
      </TouchableOpacity>
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
  viewAll: {
    fontFamily: typography.poppinsMedium,
    fontSize: 14,
    color: colors.primary700,
    marginTop: 8,
  },
});

export default RulesSection;
