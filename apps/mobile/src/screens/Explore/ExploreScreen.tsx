import React, { useCallback, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Box } from "@/theme";
import { images } from "@/theme/images";
import Tag from "../Home/component/Tag";
import SearchForm from "./component/SearchForm";
import TripExplore from "./component/TripExplore";
import FlightExplore from "./component/FlightExplore";
import { colors } from "@/theme/colors";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { TAGS_DATA } from "@/data/tagData";

interface Props {}

const ExploreScreens: React.FC<Props> = (): JSX.Element => {
  const navigation = useNavigation<any>();
  const [activeTag, setActiveTag] = useState("Hotels");

  const drawerOpen = () => {
    navigation.navigate("DRAWER");
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleTagPress = useCallback((label: string) => {
    setActiveTag(label);
  }, []);

  return (
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
      {activeTag === "Hotels" && <SearchForm />}
      {activeTag === "Trips" && <TripExplore />}
      {activeTag === "Flights" && <FlightExplore />}
    </SafeAreaView>
  );
};

export default ExploreScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imgStyle: { height: 48, width: 48, resizeMode: "contain" },
  tagList: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
