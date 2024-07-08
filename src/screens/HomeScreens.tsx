import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { RestyleText } from "../theme";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const HomeScreens: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <RestyleText
        marginTop="ten"
        fontSize={21}
        onPress={() => navigation.navigate('FAVOURITE')}
      >
        {t("auth.signIn")}
      </RestyleText>
    </View>
  );
};

export default HomeScreens;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "center",
  },
});
