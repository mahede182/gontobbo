import React from "react";
import { View, ImageBackground, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { RestyleTransparent } from "@/components/RestyleTransparent";
import { typography } from "@/theme/typography";
import GradientTitle from "@/components/GradientTitle";
import { images as img } from "@/theme/images";
import { WIDTH } from "@/utils/device";

const images = [img.initOne, img.initTwo, img.initThree];

const Indicator = ({ currentIndex }) => {
  return (
    <View style={styles.indicatorContainer}>
      {images.map((_, index) => (
        <View
          key={index}
          style={[styles.indicator, index === currentIndex ? styles.activeIndicator : null]}
        />
      ))}
    </View>
  );
};

const InitScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const flatListRef = React.useRef(null);

  const renderItem = ({ item }) => (
    <ImageBackground source={item} style={styles.imageContainer}>
      <Box style={styles.darkish}>
        <Box style={styles.formContainer}>
          <Box flexDirection="row" flexWrap="wrap">
            <RestyleText style={styles.title}>{t("common.discoveryTheWorld")}</RestyleText>
            <GradientTitle style={styles.title}>{t("common.gontobboC")}</GradientTitle>
            <RestyleText style={styles.title}>{t("common.oneJourneyAt")}</RestyleText>
          </Box>
          <RestyleTransparent opacity={0.6}>
            <RestyleText style={styles.description}>{t("common.uniqueAdvantureAwait")}</RestyleText>
          </RestyleTransparent>
          <TouchableOpacity
            onPress={() => {
              if (currentIndex === images.length - 1) {
                navigation.navigate("AUTH");
              } else if (currentIndex === 1) {
                flatListRef.current.scrollToIndex({ index: 2, animated: true });
              } else {
                flatListRef.current.scrollToIndex({ index: 1, animated: true });
              }
            }}
            style={[
              styles.button,
              currentIndex === images.length - 1
                ? { backgroundColor: colors.primary600 }
                : { backgroundColor: colors.neutral500 },
            ]}>
            <RestyleText variant="buttonLabel">Start Your Journey</RestyleText>
          </TouchableOpacity>
        </Box>
        <Indicator currentIndex={currentIndex} />
      </Box>
    </ImageBackground>
  );

  return (
    <Box style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const currentIndex = Math.round(event.nativeEvent.contentOffset.x / WIDTH);
          setCurrentIndex(currentIndex);
        }}
      />
    </Box>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: WIDTH,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  // eslint-disable-next-line react-native/no-color-literals
  darkish: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.50)",
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: typography.poppinsRegular,
    fontSize: 26,
    fontWeight: "600",
    color: colors.white,
  },
  description: {
    fontSize: 14,
    color: colors.white,
    marginVertical: 20,
  },
  button: {
    backgroundColor: colors.primary600,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
    marginHorizontal: 4,
    opacity: 0.5,
  },
  activeIndicator: {
    width: 30,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary600,
    opacity: 1,
  },
});

export default InitScreen;
