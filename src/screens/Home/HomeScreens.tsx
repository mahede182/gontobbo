import { Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, RestyleText } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { fetchUser } from "@/utils/axios";
import { useMachine } from "@xstate/react";
import { toggleMachine } from "@/machine/toggleMachine";
import "@/machine/counterMachine";
import i18n from "@/localization/i18n";
import { useTranslation } from "react-i18next";
import Icon from "@expo/vector-icons/Ionicons";
import { colors } from "@/theme/colors";

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
    <Box padding="twenty" flexDirection="row" justifyContent="space-between">
      <Icon name="menu" size={24} color={colors.black} />
      <Icon name="notifications" size={24} color={colors.black} />
    </Box>
  );
};

export default HomeScreens;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
