import React from "react";
import { Pressable, Image, StyleSheet } from "react-native";
import { Box, RestyleText } from "@/theme";
import { spacing } from "@/theme/spacing";
import { fontSizes } from "@/theme/fontSizes";
import { typography } from "@/theme/typography";
import DateIcon from "@/assets/Explore/dateIcon.png";
import { colors } from "@/theme/colors";

type DateInputProps = {
  date?: string | null;
  label: string;
  placeholder?: string;
  onPress: () => void;
};

const DateInput = ({ date, label, onPress, placeholder }: DateInputProps) => (
  <Pressable style={styles.wrapper} onPress={onPress}>
    <Box
      borderColor="neutral300"
      borderWidth={1}
      paddingLeft="small"
      paddingRight="small"
      paddingVertical="small"
      borderRadius={5}
      flexDirection="row"
      alignItems="center">
      <Image source={DateIcon} style={styles.icon} />
      <Box flexDirection="column">
        {date ? (
          <>
            <RestyleText style={styles.dateText}>{date}</RestyleText>
            <RestyleText style={styles.labelText}>{label}</RestyleText>
          </>
        ) : (
          <RestyleText style={[styles.dateText, { color: colors.neutral400, fontSize: 13 }]}>
            {placeholder || label}
          </RestyleText>
        )}
      </Box>
    </Box>
  </Pressable>
);

export default DateInput;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white100,
    flex: 1,
    marginHorizontal: 4,
  },
  icon: {
    marginRight: spacing.small,
    height: 18,
    width: 18,
    resizeMode: "contain",
  },
  dateText: {
    fontFamily: typography.poppinsMedium,
    fontSize: fontSizes.md,
    color: colors.neutral700,
  },
  labelText: {
    fontFamily: typography.poppinsRegular,
    fontSize: fontSizes.xs,
    color: colors.neutral500,
  },
});
