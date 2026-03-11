import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Box } from "@/theme";
import { images } from "@/theme/images";
import { useGetTagsQuery, type Tag as TagType } from "@/store/api/tagsApi";
import Tag from "../Home/component/Tag";
import SearchForm from "./component/SearchForm";
import { colors } from "@/theme/colors";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { dynamicCSS } from "@/utils/styles";

interface Props {}

const ExploreScreens: React.FC<Props> = (props): JSX.Element => {
  const navigation = useNavigation<any>();
  const { data: tags = [] } = useGetTagsQuery();

  const drawerOpen = () => {
    navigation.navigate("DRAWER");
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* === drawer button === */}
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <TouchableOpacity onPress={drawerOpen}>
          <Image source={images.menuBtn} style={styles.imgStyle} />
        </TouchableOpacity>
        <Image source={images.notifiocationBtn} style={styles.imgStyle} />
      </Box>
      {/* === Tag === */}
      <Box>
        <ScrollView
          style={dynamicCSS("padding", 10)}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              id={String(tag.id)}
              icon={tag.icon ? { uri: tag.icon } : images.menuBtn}
              label={tag.label}
            />
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
  imgStyle: { height: 48, width: 48, resizeMode: "contain" },
});
