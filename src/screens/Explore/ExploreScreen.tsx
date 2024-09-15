import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Box } from "@/theme";
import { images } from "@/theme/images";
import { tagData } from "@/data/tagData";
import Tag from "../Home/component/Tag";
import SearchForm from "./component/SearchForm";
import { colors } from "@/theme/colors";
import { DrawerActions, useNavigation } from "@react-navigation/native";

interface Props {}

const ExploreScreens: React.FC<Props> = (props): JSX.Element => {
  const navigation = useNavigation();
  const drawerOpen = () => {
    navigation.navigate("DRAWER");
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* === drawer button === */}
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <TouchableOpacity onPress={drawerOpen}>
          <Image source={images.menuBtn} style={{ height: 48, width: 48, resizeMode: "contain" }} />
        </TouchableOpacity>
        <Image
          source={images.notifiocationBtn}
          style={{ height: 48, width: 48, resizeMode: "contain" }}
        />
      </Box>
      {/* === Tag === */}
      <Box>
        <ScrollView
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {/* Map over tagData and render Tag component */}
          {tagData.map((tag, index) => (
            <Tag key={index} icon={tag.icon} label={tag.label} active={tag.active} />
          ))}
        </ScrollView>
      </Box>
      {/* === Search Form === */}
      <SearchForm />
    </SafeAreaView>
  );
};

export default ExploreScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
