import React from "react";
import { Pressable, Image } from "react-native";
import { Box, RestyleText } from "@/theme";
import { images } from "@/theme/images";
import { colors } from "@/theme/colors";
import { useApp } from "@/hooks/useApp";
import { typography } from "@/theme/typography";
import { useSelector } from "@xstate/react";
import { counterActor } from "@/machine/counterMachine";

type GuestInputProps = {
  onPress: () => void;
};

const GuestInput = ({ onPress }: GuestInputProps) => {
  // const { state } = useApp();
  const { rooms, adults, children } = useSelector(counterActor, (snapshot) => snapshot.context);
  return (
    <Pressable style={{ backgroundColor: colors.white100, marginBottom: 15 }} onPress={onPress}>
      <Box
        borderColor={"neutral300"}
        borderWidth={1}
        padding="small"
        borderRadius={5}
        flexDirection="row"
        alignItems="center">
        <Image
          source={images.profile}
          style={{ marginRight: 6, height: 16, width: 16, resizeMode: "contain" }}
        />
        <RestyleText
          style={{
            width: "89%",
            fontFamily: typography.poppinsSemibold,
            fontWeight: "600",
            fontSize: 16,
          }}>{`${rooms} rooms, ${adults} adults, ${children} Children`}</RestyleText>
      </Box>
    </Pressable>
  );
};

export default GuestInput;
