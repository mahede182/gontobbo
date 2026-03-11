import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Box, RestyleText } from "@/theme";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@/theme/colors";

type Props = {};

const FavouriteScreen: React.FC<Props> = (): JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <RestyleText fontSize={21} onPress={() => (navigation as any).navigate("TAB")}>
        Home
      </RestyleText>
      <Box alignItems="center" justifyContent="center" style={styles.subContainer}>
        <RestyleText fontSize={21}>{t("common.favourites" as any) ?? "Favourites"}</RestyleText>
      </Box>
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: { width: "100%", backgroundColor: colors.white },
});
