import { Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, RestyleText } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { fetchUser } from "../../utils/axios";
import { useMachine } from "@xstate/react";
import { toggleMachine } from "../../machine/toggleMachine";
import "../../machine/counterMachine";
import i18n from "../../localization/i18n";
import { useTranslation } from "react-i18next";

type Props = {};

const HomeScreens: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [state] = useMachine(toggleMachine);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    fetchUser().then((response) => {
      const data = response.data.data;
      setName(`${data?.first_name} ${data?.last_name}`);
      setEmail(data?.email);
      setImageUrl(data?.avatar);
    });
    console.log(imageUrl);
    console.log(toggleLang());
  }, [name, email, imageUrl]);
  const toggleLang = () => {
    return i18n.language === "bn" ? "en" : "bn";
  };
  return (
    <View style={styles.container}>
      <RestyleText
        marginTop="ten"
        padding="medium"
        fontSize={21}
        onPress={() => navigation.navigate("FAVOURITE")}
        style={{ backgroundColor: "tomato" }}
      >
        {t("heartBeats.selectStartAndEnd")}
      </RestyleText>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        backgroundColor="greenLight"
      >
        <Image
          height={80}
          width={80}
          borderRadius={50}
          source={{ uri: imageUrl }}
        />

        <Box marginLeft="ten" bg="purpleDark">
          <RestyleText
            fontSize={18}
            color="purpleLight"
          >{`Id: ${1}`}</RestyleText>
          <RestyleText fontSize={18}>{`Name: ${name}`}</RestyleText>
          <RestyleText fontSize={18}>{`Email: ${email}`}</RestyleText>
          <RestyleText fontSize={18}>{state.context.toggle}</RestyleText>
        </Box>
      </Box>
      <RestyleText
        marginTop="ten"
        padding="medium"
        fontSize={21}
        onPress={() => i18n.changeLanguage()}
        style={{ backgroundColor: "tomato" }}
      >
        {t("common.lang")}
      </RestyleText>
      <RestyleText>{t("common.lang")}</RestyleText>
      <RestyleText>{t("auth.createAccount")}</RestyleText>
      <RestyleText color="greenLight">{t("common.increment")}</RestyleText>
    </View>
  );
};

export default HomeScreens;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
