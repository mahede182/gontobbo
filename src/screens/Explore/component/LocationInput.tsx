import React from "react";
import { Pressable, Image } from "react-native";
import { Box, RestyleText } from "@/theme";
import { spacing } from "@/theme/spacing";
import LocationIcon from "@/assets/Explore/locIcon.png";
import { colors } from "@/theme/colors";

type LocationInputProps = {
  location: string;
  country: string;
  onPress: () => void;
};

const LocationInput = ({ country, location, onPress }: LocationInputProps) => (
  <Pressable style={{ backgroundColor: colors.white100 }} onPress={onPress}>
    <Box
      borderColor={"neutral300"}
      borderWidth={1}
      paddingHorizontal="small"
      paddingVertical="medium"
      borderRadius={5}
      flexDirection="row"
      alignItems="center">
      <Image
        source={LocationIcon}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ marginRight: spacing.small, height: 18, width: 18, resizeMode: "contain" }}
      />
      <Box flexDirection="column">
        <RestyleText variant="searchHotelTitle">{location}</RestyleText>
        <RestyleText variant="caption">{country}</RestyleText>
      </Box>
    </Box>
  </Pressable>
);

export default LocationInput;
