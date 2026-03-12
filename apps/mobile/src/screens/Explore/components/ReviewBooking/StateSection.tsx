import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { MotiView } from "moti";
import Icon from "@expo/vector-icons/MaterialIcons";

interface StateSectionProps {
  stateValue: string;
  onEdit?: () => void;
  isSavedToProfile: boolean;
  onToggleSave?: () => void;
}

const StateSection: React.FC<StateSectionProps> = ({
  stateValue,
  onEdit,
  isSavedToProfile,
  onToggleSave,
}) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500, delay: 500 }}
      style={styles.container}>
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <RestyleText style={styles.title}>Your State</RestyleText>
        <TouchableOpacity onPress={onEdit}>
          <RestyleText style={styles.editButton}>Edit</RestyleText>
        </TouchableOpacity>
      </Box>

      <Box style={styles.inputContainer}>
        <RestyleText style={styles.valueText}>{stateValue || "USA / Outside USA"}</RestyleText>
      </Box>

      <TouchableOpacity style={styles.checkboxContainer} onPress={onToggleSave} activeOpacity={0.7}>
        <Icon
          name={isSavedToProfile ? "check-circle" : "radio-button-unchecked"}
          size={18}
          color={isSavedToProfile ? colors.primary700 : colors.neutral400}
        />
        <RestyleText style={styles.checkboxLabel}>
          Confirm and save these details to your profile
        </RestyleText>
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
  },
  editButton: {
    fontFamily: typography.poppinsMedium,
    fontSize: 14,
    color: colors.primary700,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.neutral200,
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    backgroundColor: colors.white,
  },
  valueText: {
    fontFamily: typography.poppinsRegular,
    fontSize: 14,
    color: colors.neutral500,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  checkboxLabel: {
    fontFamily: typography.poppinsRegular,
    fontSize: 12,
    color: colors.neutral500,
    marginLeft: 8,
  },
});

export default StateSection;
