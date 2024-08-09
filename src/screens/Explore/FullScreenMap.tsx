import React from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Box } from "@/theme";
import { colors } from "@/theme/colors";
import { useNavigation } from "@react-navigation/native";
import GradientTitle from "@/components/GradientTitle";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RestyleTransparent } from "@/components/RestyleTransparent";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("window");

const FullScreenMap = () => {
  const navigation = useNavigation();
  const { images } = useTheme<Theme>();
  const { t } = useTranslation();

  return (
    <Box flex={1}>
      {/* === Header === */}
      <Box
        flexDirection={"row"}
        alignItems={"center"}
        marginVertical={"medium"}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={images.back} />
        </TouchableOpacity>

        <GradientTitle variant="gradientTitle">
          {t("Explore.fullScreenMap")}
        </GradientTitle>
      </Box>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Hotel Location"
        >
          <RestyleTransparent opacity={0.25}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SELECT_ROOM")}
              style={{
                width: 250,
                height: 250,
                backgroundColor: "red",
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </RestyleTransparent>
        </Marker>
      </MapView>
    </Box>
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
    borderColor: colors.greyLight,
    borderWidth: 1,
  },
});

export default FullScreenMap;
