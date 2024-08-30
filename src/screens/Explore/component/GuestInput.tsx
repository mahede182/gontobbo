import React from "react";
import { Pressable, Image } from "react-native";
import { Box, RestyleText } from "@/theme";
import { images } from "@/theme/images";
import { colors } from "@/theme/colors";
type GuestInputProps = {
  guests: string;
  onPress: () => void;
};

const GuestInput = ({ guests, onPress }: GuestInputProps) => (
  <Pressable style={{ backgroundColor: colors.white100 }} onPress={onPress}>
    <Box
      borderColor={"neutral300"}
      borderWidth={1}
      padding="small"
      borderRadius={5}
      flexDirection="row"
      alignItems="center">
      <Image
        source={images.profile}
        style={{ marginRight: 6, height: 24, width: 24, resizeMode: "contain" }}
      />
      <RestyleText variant="gradientTitle">{guests}</RestyleText>
    </Box>
  </Pressable>
);

export default GuestInput;
