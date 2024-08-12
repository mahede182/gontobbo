import React from "react";
import { Pressable, Image } from "react-native";
import { Box, RestyleText } from "@/theme";
import { spacing } from "@/theme/spacing";
import LocationIcon from "@/assets/Explore/locIcon.png";

type LocationInputProps = {
  location: string;
  onPress: () => void;
};

const LocationInput = ({ location, onPress }: LocationInputProps) => (
  <Pressable style={{ backgroundColor: "white100" }} onPress={onPress}>
    <Box
      borderColor={"neutral300"}
      borderWidth={1}
      paddingHorizontal="small"
      paddingVertical="medium"
      borderRadius={5}
      flexDirection="row"
      alignItems="center"
    >
      <Image source={LocationIcon} style={{ marginRight: spacing.small }} />
      <RestyleText variant="textBase">{location}</RestyleText>
    </Box>
  </Pressable>
);

export default LocationInput;
