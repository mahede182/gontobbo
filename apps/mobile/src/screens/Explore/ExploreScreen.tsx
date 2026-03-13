import React, { useCallback, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Box } from "@/theme";
import { images } from "@/theme/images";
import Tag from "../Home/component/Tag";
import SearchForm from "./component/SearchForm";
import TripExplore from "./component/TripExplore";
import FlightExplore from "./component/FlightExplore";
import { colors } from "@/theme/colors";
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/native";
import { TAGS_DATA } from "@/data/tagData";
import Background from "@/components/Background";

interface Props {}

const ExploreScreens: React.FC<Props> = (): JSX.Element => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [activeTag, setActiveTag] = useState("Hotels");

  // Capture params from navigation (e.g. from SELECT_LOCATION)
  const selectedLocation = route.params?.selectedLocation;

  const drawerOpen = () => {
    navigation.navigate("DRAWER");
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleTagPress = useCallback((label: string) => {
    setActiveTag(label);
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        {/* === Drawer button === */}
        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
          <TouchableOpacity onPress={drawerOpen}>
            <Image source={images.menuBtn} style={styles.imgStyle} />
          </TouchableOpacity>
          <Image source={images.notifiocationBtn} style={styles.imgStyle} />
        </Box>

        {/* === Tags === */}
        <View style={{ flexGrow: 0, paddingVertical: 10 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 0 }}
            contentContainerStyle={styles.tagList}>
            {TAGS_DATA.map((tag) => (
              <Tag
                key={tag.id}
                id={tag.id}
                icon={tag.icon}
                label={tag.label}
                active={activeTag === tag.label}
                onPress={handleTagPress}
              />
            ))}
          </ScrollView>
        </View>

        {/* === Content based on active tag === */}
        {activeTag === "Hotels" && <SearchForm initialLocation={selectedLocation} />}
        {activeTag === "Trips" && <TripExplore />}
        {activeTag === "Flights" && <FlightExplore />}
      </SafeAreaView>
    </Background>
  );
};

export default ExploreScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgStyle: { height: 48, width: 48, resizeMode: "contain" },
  tagList: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
