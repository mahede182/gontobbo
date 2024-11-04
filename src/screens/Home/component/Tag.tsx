// src/screens/Home/component/Tag.tsx
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { useMachine } from "@xstate/react";
import { tagMachine } from "@/machine/tagMachine";

type Props = {
  id: number;
  icon: any;
  label: string;
};

const Tag = ({ icon, label, id }: Props) => {
  const [state, send] = useMachine(tagMachine);

  const handlePress = () => {
    send({ type: "TOGGLE", id });
  };

  const { active } = state.context;

  return (
    <TouchableOpacity onPress={handlePress}>
      <Box style={styles.container(active)}>
        <Image source={icon} style={styles.icon} tintColor={active ? "#fff" : "#000"} />
        <RestyleText style={styles.label(active)}>{label}</RestyleText>
      </Box>
    </TouchableOpacity>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: (active: boolean) => ({
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: active ? colors.blue800 : "#fff",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 10,
  }),
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  label: (active: boolean) => ({
    fontFamily: typography.poppinsMedium,
    fontSize: 16,
    color: active ? "#fff" : "#000",
  }),
});
