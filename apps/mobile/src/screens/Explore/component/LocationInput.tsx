import React from "react";
import { Pressable, Image } from "react-native";
import { Box, RestyleText } from "@/theme";
import { spacing } from "@/theme/spacing";
import LocationIcon from "@/assets/Explore/locIcon.png";
import { colors } from "@/theme/colors";

type LocationInputProps = {
  location?: string;
  country?: string;
  placeholder?: string;
  onPress: () => void;
};

const LocationInput = ({
  country,
  location,
  onPress,
  placeholder = "Select Location",
}: LocationInputProps) => (
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
        style={{ marginRight: spacing.small, height: 18, width: 18, resizeMode: "contain" }}
      />
      <Box flexDirection="column">
        {location ? (
          <>
            <RestyleText variant="searchHotelTitle">{location}</RestyleText>
            {country && <RestyleText variant="caption">{country}</RestyleText>}
          </>
        ) : (
          <RestyleText variant="searchHotelTitle" color="neutral400">
            {placeholder}
          </RestyleText>
        )}
      </Box>
    </Box>
  </Pressable>
);

export default LocationInput;
