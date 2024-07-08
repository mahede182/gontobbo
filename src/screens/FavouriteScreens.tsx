import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { RestyleText } from "../theme";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const FavouriteScreens: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <RestyleText fontSize={21} onPress={() => navigation.navigate('HOME')}>
        {t("auth.createAccount")}
      </RestyleText>
    </View>
  );
};

export default FavouriteScreens;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "center",
  },
});
