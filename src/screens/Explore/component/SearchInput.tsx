import React from "react";
import { Pressable } from "react-native";
import { Box, RestyleText } from "@/theme";

type SearchButtonProps = {
  onPress: () => void;
};

const SearchButton = ({ onPress }: SearchButtonProps) => (
  <Pressable onPress={onPress}>
    <Box
      backgroundColor={"purpleDark"}
      padding="medium"
      borderRadius={5}
      marginVertical={"medium"}
      alignItems="center"
    >
      <RestyleText variant="buttonLabel">Search Hotels</RestyleText>
    </Box>
  </Pressable>
);

export default SearchButton;
