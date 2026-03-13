import React from "react";
import { StyleSheet, View } from "react-native";
import { MotiView } from "moti";
import { Box } from "@/theme";
import { colors } from "@/theme/colors";

const EmptyWishlist: React.FC = () => {
  return (
    <Box alignItems="center">
      <View style={styles.emptyIllustrationContainer}>
        <Box style={styles.boxContainer}>
          <MotiView
            from={{ translateY: 0 }}
            animate={{ translateY: -5 }}
            transition={{
              type: "timing",
              duration: 2000,
              loop: true,
              repeatReverse: true,
            }}
            style={styles.box}
          />
          <MotiView
            from={{ rotate: "-5deg" }}
            animate={{ rotate: "5deg" }}
            transition={{
              type: "timing",
              duration: 1500,
              loop: true,
              repeatReverse: true,
            }}
            style={styles.personLegs}
          />
        </Box>
        <Box style={styles.cloudsContainer}>
          <MotiView
            from={{ translateX: -10, opacity: 0.3 }}
            animate={{ translateX: 10, opacity: 0.8 }}
            transition={{
              type: "timing",
              duration: 3000,
              loop: true,
              repeatReverse: true,
            }}
            style={[styles.cloud, styles.cloudSmall]}
          />
          <MotiView
            from={{ translateX: 10, opacity: 0.3 }}
            animate={{ translateX: -10, opacity: 0.8 }}
            transition={{
              type: "timing",
              duration: 4000,
              loop: true,
              repeatReverse: true,
            }}
            style={[styles.cloud, styles.cloudMedium]}
          />
        </Box>
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  emptyIllustrationContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  boxContainer: {
    position: "relative",
    width: 120,
    height: 100,
  },
  box: {
    width: 100,
    height: 80,
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.black,
    borderRadius: 8,
    position: "absolute",
    top: 10,
    left: 10,
  },
  personLegs: {
    width: 40,
    height: 50,
    backgroundColor: colors.primary700,
    position: "absolute",
    bottom: 0,
    left: 20,
    borderRadius: 4,
  },
  cloudsContainer: {
    flexDirection: "row",
    marginTop: 10,
    gap: 8,
  },
  cloud: {
    backgroundColor: colors.neutral300,
    borderRadius: 10,
  },
  cloudSmall: {
    width: 20,
    height: 10,
  },
  cloudMedium: {
    width: 30,
    height: 12,
  },
});

export default EmptyWishlist;
