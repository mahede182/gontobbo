import React from "react";
import { StyleSheet, Dimensions, Image, SafeAreaView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { useNavigation } from "@react-navigation/native";
import GradientTitle from "@/components/GradientTitle";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RestyleTransparent } from "@/components/RestyleTransparent";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";
import { useTranslation } from "react-i18next";
import { dynamicCSS } from "@/utils/styles";
import { isIOS } from "@/utils/device";
import Icon from "@expo/vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");

const FullScreenMap = () => {
  const navigation = useNavigation();
  const { images } = useTheme<Theme>();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={dynamicCSS("flex", 1)}>
      {/* === Header === */}
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
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
        <Box
          position="absolute"
          backgroundColor="white"
          padding="medium"
          borderRadius={8}
          style={{ opacity: 0.9 }}>
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
  backButton: {
    padding: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    borderColor: colors.white200,
    borderWidth: 1,
  },
  customMarker: {
    backgroundColor: colors.primary700,
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default FullScreenMap;
