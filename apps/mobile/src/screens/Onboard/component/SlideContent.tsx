import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import Animated from "react-native-reanimated";
import { MotiView, MotiText } from "moti";
import { RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import GradientTitle from "@/components/GradientTitle";

interface SlideContentProps {
  isActive: boolean;
  isLast: boolean;
  onPress: () => void;
  btnAnimStyle: any;
}

const SlideContent = ({ isActive, isLast, onPress, btnAnimStyle }: SlideContentProps) => {
  const { t } = useTranslation();

  const base = { type: "timing" as const, duration: 460 };
  const slideUp = (delay: number) =>
    isActive
      ? {
          from: { opacity: 0, translateY: 40 },
          animate: { opacity: 1, translateY: 0 },
          transition: { ...base, delay },
        }
      : {
          from: { opacity: 0, translateY: 40 },
          animate: { opacity: 0, translateY: 40 },
          transition: { ...base, delay: 0 },
        };

  return (
    <View style={styles.content}>
      {/* Title block */}
      <MotiView {...slideUp(160)} style={styles.titleRow}>
        <RestyleText style={styles.title}>{t("common.discoveryTheWorld")}</RestyleText>
        <GradientTitle style={styles.title}>{t("common.gontobboC")}</GradientTitle>
        <RestyleText style={styles.title}>{t("common.oneJourneyAt")}</RestyleText>
      </MotiView>

      {/* Subtitle */}
      <MotiText
        from={{ opacity: 0, translateY: 36 }}
        animate={{ opacity: isActive ? 0.72 : 0, translateY: isActive ? 0 : 36 }}
        transition={{ ...base, delay: isActive ? 280 : 0 }}
        style={styles.description}>
        {t("common.uniqueAdvantureAwait")}
      </MotiText>

      {/* CTA button */}
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: isActive ? 1 : 0, translateY: isActive ? 0 : 30 }}
        transition={{ ...base, delay: isActive ? 380 : 0 }}>
        <Animated.View style={btnAnimStyle}>
          <Pressable
            onPress={onPress}
            style={({ pressed }) => [
              styles.button,
              isLast ? styles.buttonActive : styles.buttonNext,
              pressed && styles.buttonPressed,
            ]}>
            <RestyleText variant="buttonLabel">
              {isLast ? "Start Your Journey" : "Next"}
            </RestyleText>
          </Pressable>
        </Animated.View>
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  titleRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  title: {
    fontFamily: typography.poppinsRegular,
    fontSize: 26,
    fontWeight: "600",
    color: colors.white,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: colors.white,
    textAlign: "center",
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  buttonNext: {
    backgroundColor: colors.neutral500,
  },
  buttonActive: {
    backgroundColor: colors.primary600,
  },
  buttonPressed: {
    opacity: 0.82,
  },
});

export default SlideContent;
