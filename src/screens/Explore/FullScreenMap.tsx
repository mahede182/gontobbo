import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Box } from "@/theme";
import { colors } from "@/theme/colors";
import Icon from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import GradientTitle from "@/components/GradientTitle";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RestyleTransparent } from "@/components/RestyleTransparent";

const { width, height } = Dimensions.get("window");

const FullScreenMap = () => {
  const navigation = useNavigation();

  return (
    <Box flex={1}>
      {/* === Header === */}
      <Box flexDirection={"row"} alignItems={"center"} marginBottom={"medium"}>
        <Box
          style={{ height: 32, width: 32, marginRight: 10 }}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={32}
          borderColor={"greyLight"}
          borderWidth={1}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color={colors.black} />
          </TouchableOpacity>
        </Box>
        <GradientTitle variant="gradientTitle">Full Screen Map</GradientTitle>
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
            <Box
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
});

export default FullScreenMap;
