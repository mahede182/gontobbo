import { Image, Pressable } from "react-native";
import React from "react";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { images } from "@/theme/images";

type SelectFlightProps = {
  title: string;
  subTitle: string;
  onPress: () => void;
};

const SelectFlight: React.FC<SelectFlightProps> = ({ title, subTitle, onPress }) => {
  return (
    <Pressable style={{ backgroundColor: colors.white100 }} onPress={onPress}>
      <Box
        borderColor={"neutral300"}
        borderWidth={1}
        padding="small"
        borderRadius={5}
        flexDirection="row"
        alignItems="center">
        <Image
          source={images.flightIcon}
          style={{ marginRight: 6, height: 24, width: 24, resizeMode: "contain" }}
        />
        <Box>
          <RestyleText variant="gradientTitle">{title}</RestyleText>
          <RestyleText variant="caption">{subTitle}</RestyleText>
        </Box>
      </Box>
    </Pressable>
  );
};

export default SelectFlight;
