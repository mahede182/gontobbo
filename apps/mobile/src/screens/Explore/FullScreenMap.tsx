import React from "react";
import { StyleSheet, Dimensions, Image, SafeAreaView } from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { useNavigation } from "@react-navigation/native";
import GradientTitle from "@/components/GradientTitle";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";
import { useTranslation } from "react-i18next";
import { dynamicCSS } from "@/utils/styles";

const { width, height } = Dimensions.get("window");

const FullScreenMap = () => {
  const navigation = useNavigation();
  const { images } = useTheme<Theme>();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={dynamicCSS("flex", 1)}>
      <Box flexDirection={"row"} alignItems={"center"} marginVertical={"medium"}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={images.back} />
        </TouchableOpacity>

        <GradientTitle>{t("Explore.fullScreenMap")}</GradientTitle>
      </Box>

      <Box
        style={styles.map}
        alignItems="center"
        justifyContent="center"
        backgroundColor="neutral100">
        <Image
          source={images.map || { uri: "https://via.placeholder.com/800x800?text=Map+View" }}
          style={styles.mapImage}
          resizeMode="cover"
        />
        <Box
          position="absolute"
          backgroundColor="white"
          padding="medium"
          borderRadius={8}
          style={styles.mapOverlay}>
          <RestyleText variant="textBase" color="black100">
            Map View (Static)
          </RestyleText>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: width,
    height: height - 100,
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  mapOverlay: {
    opacity: 0.9,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    borderColor: colors.white200,
    borderWidth: 1,
  },
});

export default FullScreenMap;
