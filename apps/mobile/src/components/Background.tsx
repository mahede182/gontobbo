import React from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { images } from "@/theme/images";
import { colors } from "@/theme/colors";

type Props = {
  children: React.ReactNode;
};

const Background: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ImageBackground source={images.backgroundTexture} style={styles.container}>
        {children}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Background;

const styles = StyleSheet.create({
  safeAreaContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.neutral100,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
});
