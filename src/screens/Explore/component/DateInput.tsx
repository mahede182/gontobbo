import React from "react";
import { Pressable, Image } from "react-native";
import { Box, RestyleText } from "@/theme";
import { spacing } from "@/theme/spacing";
import DateIcon from "@/assets/Explore/dateIcon.png";
import { colors } from "@/theme/colors";
type DateInputProps = {
  date: string;
  onPress: () => void;
};

const DateInput = ({ date, onPress }: DateInputProps) => (
  <Pressable style={{ backgroundColor: colors.white100 }} onPress={onPress}>
    <Box
      borderColor="neutral300"
      borderWidth={1}
      paddingHorizontal="large"
      paddingVertical="small"
      borderRadius={5}
      flexDirection="row"
      alignItems="center">
      <Image source={DateIcon} style={{ marginRight: spacing.small }} />
      <Box flexDirection={"column"}>
        <RestyleText variant="textBase">{date}</RestyleText>
        <RestyleText variant="caption">{"Check-in"}</RestyleText>
      </Box>
    </Box>
  </Pressable>
);

export default DateInput;
