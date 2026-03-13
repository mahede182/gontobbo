import { colors } from "@/theme/colors";
import { MotiView, View } from "moti";
import { StyleSheet } from "react-native";

export const TypingIndicator = () => (
  <MotiView
    from={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ loop: true, type: "timing", duration: 600 }}
    style={styles.typingIndicator}>
    <View style={styles.dot} />
    <MotiView
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ loop: true, duration: 600, delay: 100 }}
      style={styles.dot}
    />
    <MotiView
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ loop: true, duration: 600, delay: 200 }}
      style={styles.dot}
    />
  </MotiView>
);

const styles = StyleSheet.create({
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.blue800,
    marginHorizontal: 2,
  },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
});
