import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box, RestyleText } from "./theme";
import { useTranslation } from "react-i18next";

type Props = {};

const LocalizationTest = (props: Props) => {
  const { t } = useTranslation();
  return (
    <Box padding="medium" margin="forty" style={{backgroundColor: "#ddd"}}>
      <RestyleText textAlign="center">{t("auth.signIn")}</RestyleText>
      <RestyleText marginVertical="five" textAlign="center">{t("common.back")}</RestyleText>
      <RestyleText textAlign="center">{t("auth.createAccount")}</RestyleText>
    </Box>
  );
};

export default LocalizationTest;

const styles = StyleSheet.create({});
