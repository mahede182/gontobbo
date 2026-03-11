import React from "react";
import { View, Switch, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";

interface PreferenceItemProps {
  item: { key: string; label: string; value: boolean };
  index: number;
  onToggle: (key: string, value: boolean) => void;
}

const PreferenceItem: React.FC<PreferenceItemProps> = ({ item, index, onToggle }) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 100 }}
      style={styles.preferenceContainer}>
      <RestyleText variant="textBase" fontFamily={typography.poppinsMedium}>
        {item.label}
      </RestyleText>
      <Switch
        value={item.value}
        onValueChange={(val) => onToggle(item.key, val)}
        trackColor={{ true: colors.primary700, false: colors.neutral300 }}
        thumbColor={colors.white}
      />
    </MotiView>
  );
};

const styles = StyleSheet.create({
  preferenceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral100,
  },
});

export default PreferenceItem;
