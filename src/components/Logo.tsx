import React from "react";
import { Image, StyleSheet } from "react-native";
import GontobboLogo from "@/assets/logo.png";
import { Box, RestyleText } from "../theme";
import { useTranslation } from "react-i18next";

const Logo = () => {
  const { t } = useTranslation();
  return (
    <Box alignItems="center" marginTop="xxl">
      <Image style={styles.logo} source={GontobboLogo} />
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
