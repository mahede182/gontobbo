/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Box } from "@/theme";

import { useTheme } from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Input } from "@/components/Input";
import PopularTrip from "./component/PopularTrip";
import { useTranslation } from "react-i18next";
import Tag from "./component/Tag";
import { useGetTagsQuery, type Tag as TagType } from "@/store/api/tagsApi";
import FeaturedHotels from "./component/FeaturedHotels";
import GradientTitle from "@/components/GradientTitle";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useAppSelector } from "@/store/hooks";

type Props = {};

const HomeScreen: React.FC<Props> = (props: Props): JSX.Element => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { images } = useTheme<Theme>();
  const { user } = useAppSelector((state) => state.auth);
  const { data: tags = [] } = useGetTagsQuery();

  const drawerOpen = () => {
    (navigation as any).navigate("DRAWER");
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* === Header === */}
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal="medium">
          <TouchableOpacity onPress={drawerOpen}>
            <Image
              source={images.menuBtn}
              style={{ height: 48, width: 48, resizeMode: "contain" }}
            />
          </TouchableOpacity>
          <Pressable onPress={() => (navigation as any).navigate("NOTIFICATION")}>
            <Image
              source={images.notifiocationBtn}
              style={{ height: 48, width: 48, resizeMode: "contain" }}
            />
          </Pressable>
        </Box>

        {/* === AI Section === */}
        <Box paddingHorizontal="medium" marginTop="small">
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            marginBottom="ten">
            <Image source={images.magicAiBtn} style={{ height: 16, width: 16, marginRight: 10 }} />
            <GradientTitle style={{ fontFamily: typography.poppinsRegular, fontSize: 13 }}>
              {t("Home.askAi")}
            </GradientTitle>
          </Box>
          <Input placeholder={t("Home.askMeAnything")} />
        </Box>

        {/* === Tags === */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagList}>
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              id={tag.id}
              icon={tag.icon ? { uri: tag.icon } : images.menuBtn}
              label={tag.label}
            />
          ))}
        </ScrollView>

        {/* === Featured Hotels === */}
        <FeaturedHotels />

        {/* === Popular Trips === */}
        <PopularTrip />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral100,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  tagList: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
