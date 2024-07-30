import React from "react";
import { Image, StyleSheet } from "react-native";
import { Box, RestyleText } from "../theme";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";

const Logo = () => {
  const { t } = useTranslation();
  const { images } = useTheme<Theme>();
  return (
    <Box alignItems="center" marginTop="xxl">
      <Image style={styles.logo} source={images.appLogo} />
      <RestyleText fontWeight="bold" fontSize={24}>
        {t("common.gontobbo")}
      </RestyleText>
      <RestyleText fontSize={16} color="sloganColor" textAlign="center">
        {t("common.gontobboSlogan")}
      </RestyleText>
    </Box>
  );
};
export default Logo;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
