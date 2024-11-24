import React from "react";
import { Image, NativeModules, StyleSheet } from "react-native";
import { Box, RestyleText } from "../theme";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";
import { isIOS } from "@/utils/device";

const Logo = () => {
  const env = isIOS ? NativeModules.RNMultiEnv.env : "";
  const { t } = useTranslation();
  const { images } = useTheme<Theme>();
  return (
    <Box alignItems="center" marginTop="thirty">
      <Image style={styles.logo} source={images.appLogo} />
      {/* TODO: create a new variant of text if found another same size and weight */}
      <RestyleText style={styles.title}>
        {t("common.gontobbo")} {env}
      </RestyleText>
      <RestyleText style={styles.subtitle} textAlign="center">
        {t("common.gontobboSlogan")}
      </RestyleText>
    </Box>
  );
};
export default Logo;

const styles = StyleSheet.create({
  logo: {
    width: "20%",
    resizeMode: "contain",
    marginVertical: 10,
  },
  title: {
    color: colors.neutral700,
    fontFamily: typography.poppinsBold,
    fontWeight: "600",
    fontSize: 30,
    marginVertical: 5,
  },
  subtitle: {
    color: colors.neutral600,
    fontFamily: typography.poppinsRegular,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
  },
});
