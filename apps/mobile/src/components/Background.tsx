import React from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { images } from "@/theme/images";
import { spacing } from "@/theme/spacing";
import { isIOS } from "@/utils/device";

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
  },
  container: {
    flex: 1,
    paddingHorizontal: isIOS ? spacing.tiny : spacing.large,
    justifyContent: "space-between",
  },
});
