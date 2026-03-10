/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { Box } from "@/theme";
import { getUserAsync } from "@/api/auth";

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
import { getTags, Tag as TagType } from "@/api/tags";
import FeaturedHotels from "./component/FeaturedHotels";
import GradientTitle from "@/components/GradientTitle";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useApp } from "@/hooks/useApp";
import { dynamicCSS } from "@/utils/styles";

type Props = {};

const HomeScreen: React.FC<Props> = (props: Props): JSX.Element => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { images } = useTheme<Theme>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [tags, setTags] = useState<TagType[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { state: appState } = useApp();

  useEffect(() => {
    getUserAsync().then((user) => {
      if (user) {
        const parsed = typeof user === "string" ? JSON.parse(user) : user;
        setName(`${parsed.firstName ?? ""} ${parsed.lastName ?? ""}`.trim());
        setEmail(parsed.email ?? "");
        setImageUrl(parsed.avatar ?? "");
      }
    });
    getTags()
      .then(setTags)
      .catch(() => {});
  }, []);

  const drawerOpen = () => {
    navigation.navigate("DRAWER");
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* === drawer button === */}
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <TouchableOpacity onPress={drawerOpen}>
          <Image source={images.menuBtn} style={{ height: 48, width: 48, resizeMode: "contain" }} />
        </TouchableOpacity>
        <Pressable
          onPress={() => {
            navigation.navigate("NOTIFICATION");
          }}>
          <Image
            source={images.notifiocationBtn}
            style={{ height: 48, width: 48, resizeMode: "contain" }}
          />
        </Pressable>
      </Box>
      {/* === ai section === */}
      <Box paddingHorizontal="ten">
        <Box flexDirection="row" alignItems="center" justifyContent="flex-start" marginBottom="ten">
          <Image source={images.magicAiBtn} style={{ height: 16, width: 16, marginRight: 10 }} />
          <GradientTitle style={{ fontFamily: typography.poppinsRegular, fontSize: 13 }}>
            {t("Home.askAi")}
          </GradientTitle>
        </Box>
        <Input placeholder={t("Home.askMeAnything")} />
      </Box>
      {/* === Tag === */}
      <Box>
        <ScrollView
          style={(dynamicCSS("paddingVertical", 10), dynamicCSS("paddingHorizontal", 10))}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              id={tag.id}
              icon={tag.icon ? { uri: tag.icon } : images.menuBtn}
              label={tag.label}
            />
          ))}
        </ScrollView>
      </Box>
      {/* === Hotel card section === */}
      <FeaturedHotels />
      {/* === trip card === */}
      <PopularTrip />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.neutral100,
  },
});
