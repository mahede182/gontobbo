import React from "react";
import { Pressable } from "react-native";
import { Box, RestyleText } from "@/theme";
import { useTranslation } from "react-i18next";

type SearchButtonProps = {
  onPress: () => void;
};

const SearchButton = ({ onPress }: SearchButtonProps) => {
  const { t } = useTranslation();
  return (
    <Pressable onPress={onPress}>
      <Box
        backgroundColor={"purpleDark"}
        padding="medium"
        borderRadius={5}
        marginVertical={"medium"}
        alignItems="center"
      >
        <RestyleText variant="buttonLabel">
          {t("common.searchHotel")}
        </RestyleText>
      </Box>
    </Pressable>
  );
};

export default SearchButton;
