import React, { useCallback } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { MotiView } from "moti";
import { Box } from "@/theme";
import { images as img } from "@/theme/images";
import { WIDTH } from "@/utils/device";
import { useAppDispatch } from "@/store/hooks";
import { setFirstLaunch } from "@/store/slices/appSlice";
import { APP_INITIALIZED } from "@/constants/config";
import Dot from "./component/Dot";
import SlideContent from "./component/SlideContent";

const slides = [
  { image: img.onboardOne, key: "slide0" },
  { image: img.onboardTwo, key: "slide1" },
  { image: img.onboardThree, key: "slide2" },
];
const TOTAL = slides.length;

const OnboardScreen = () => {
  const dispatch = useAppDispatch();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const translateX = useSharedValue(0);
  const btnScale = useSharedValue(1);

  React.useEffect(() => {
    if (activeIndex === TOTAL - 1) {
      btnScale.value = withRepeat(
        withSequence(withTiming(1.06, { duration: 600 }), withTiming(1.0, { duration: 600 })),
        -1,
        false,
      );
    } else {
      btnScale.value = withTiming(1, { duration: 200 });
    }
  }, [activeIndex, btnScale]);

  const btnAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: btnScale.value }],
  }));

  const stripStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const goToSlide = useCallback(
    (index: number) => {
      translateX.value = withSpring(-index * WIDTH, {
        damping: 22,
        stiffness: 160,
        mass: 0.8,
      });
      setActiveIndex(index);
    },
    [translateX],
  );

  const handlePress = useCallback(async () => {
    if (activeIndex < TOTAL - 1) {
      goToSlide(activeIndex + 1);
    } else {
      await AsyncStorage.setItem(APP_INITIALIZED, "1");
      dispatch(setFirstLaunch(false));
    }
  }, [activeIndex, dispatch, goToSlide]);

  const isLast = activeIndex === TOTAL - 1;

  return (
    <Box style={styles.root}>
      <Animated.View style={[styles.strip, stripStyle]}>
        {slides.map(({ image, key }, idx) => {
          const isActive = idx === activeIndex;
          return (
            <MotiView
              key={key}
              animate={{ opacity: isActive ? 1 : 0.35 }}
              transition={{ type: "timing", duration: 550 }}
              style={styles.slideWrapper}>
              <ImageBackground source={image} style={styles.slide}>
                <View style={styles.overlay} />
                <SlideContent
                  isActive={isActive}
                  isLast={isLast}
                  onPress={handlePress}
                  btnAnimStyle={btnAnimStyle}
                />
                <MotiView
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ type: "timing", duration: 300 }}
                  style={styles.dots}>
                  {slides.map((_, dotIdx) => (
                    <Dot key={dotIdx} index={dotIdx} activeIndex={activeIndex} />
                  ))}
                </MotiView>
              </ImageBackground>
            </MotiView>
          );
        })}
      </Animated.View>
    </Box>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: "hidden",
  },
  strip: {
    flexDirection: "row",
    width: WIDTH * TOTAL,
    flex: 1,
  },
  slideWrapper: {
    width: WIDTH,
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.50)",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 32,
    gap: 6,
  },
});

export default OnboardScreen;
