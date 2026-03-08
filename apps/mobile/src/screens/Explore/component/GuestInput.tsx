import React from "react";
import { Pressable, Image, StyleSheet } from "react-native";
import { Box, RestyleText } from "@/theme";
import { images } from "@/theme/images";
import { colors } from "@/theme/colors";
import { useSelector } from "@xstate/react";
import { counterActor } from "@/machine/counterMachine";

type GuestInputProps = {
  onPress: () => void;
};

const GuestInput = ({ onPress }: GuestInputProps) => {
  // const { state } = useApp();
  const { rooms, adults, children } = useSelector(counterActor, (snapshot) => snapshot.context);
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Box
        borderColor={"neutral300"}
        borderWidth={1}
        padding="small"
        borderRadius={5}
        flexDirection="row"
        alignItems="center">
        <Image source={images.profile} style={styles.imgStyle} />
        <Box flexDirection={"column"}>
          <RestyleText
            variant={
              "searchHotelTitle"
            }>{`${rooms} rooms, ${adults} adults, ${children} Children`}</RestyleText>
          <RestyleText variant={"caption"}>Rooms and Guests</RestyleText>
        </Box>
      </Box>
    </Pressable>
  );
};

export default GuestInput;

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white100, marginBottom: 15 },
  imgStyle: { marginRight: 6, height: 16, width: 16, resizeMode: "contain" },
});
