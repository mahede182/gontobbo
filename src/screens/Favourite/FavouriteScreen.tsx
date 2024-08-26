import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Box, RestyleText } from "@/theme";
import { counterMachine } from "@/machine/counterMachine";
import { useMachine } from "@xstate/react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@/theme/colors";

type Props = {};

const FavouriteScreen: React.FC<Props> = (): JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [state, send] = useMachine(counterMachine);
  return (
    <View style={styles.container}>
      <RestyleText fontSize={21} onPress={() => navigation.navigate("TAB")}>
        Home
      </RestyleText>
      <Box
        alignItems="center"
        justifyContent="center"
        style={{ width: "100%", backgroundColor: colors.white }}>
        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 5,
            borderColor: colors.black,
            borderWidth: 2,
          }}
          onPress={() => send({ type: "INC" })}>
          <RestyleText fontSize={21}> + {t("common.increment")}</RestyleText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 5,
            borderColor: colors.black,
            borderWidth: 2,
          }}
          onPress={() => send({ type: "DEC" })}>
          <RestyleText fontSize={21}> - {t("common.decrement")} </RestyleText>
        </TouchableOpacity>

        <RestyleText fontSize={21} onPress={() => send({ type: "SET", value: 10 })}>
          {t("common.reset")}
        </RestyleText>
        <RestyleText fontSize={32} marginTop="xxl">
          {state.context.count}
        </RestyleText>
      </Box>
      <Box height={200} width={200} />
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
