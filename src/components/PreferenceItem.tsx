import React from "react";
import { Switch } from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";

type PreferenceItemProps = {
  title: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export const PreferenceItem = ({
  title,
  description,
  value,
  onValueChange,
}: PreferenceItemProps) => (
  <Box paddingVertical="small">
    <Box flexDirection="row" justifyContent="space-between" alignItems="center">
      <RestyleText variant="textBase" color="neutral900">
        {title}
      </RestyleText>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ true: colors.primary500, false: colors.neutral300 }}
        thumbColor={colors.white100}
      />
    </Box>
    {description && (
      <RestyleText variant="textSm" color="neutral600" marginTop="xxsmall">
        {description}
      </RestyleText>
    )}
  </Box>
);
