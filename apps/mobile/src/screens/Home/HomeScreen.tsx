/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from "react";
import { Box } from "@/theme";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PopularTrip from "./component/PopularTrip";
import { useTranslation } from "react-i18next";
import Tag from "./component/Tag";
import FeaturedHotels from "./component/FeaturedHotels";
import GradientTitle from "@/components/GradientTitle";
import { typography } from "@/theme/typography";
import { fontSizes } from "@/theme/fontSizes";
import { colors } from "@/theme/colors";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { TAGS_DATA } from "@/data/tagData";
import Icon from "@expo/vector-icons/Ionicons";
import Background from "@/components/Background";

type Props = {};
const _IMG_SIZE = 52;

const HomeScreen: React.FC<Props> = (props: Props): JSX.Element => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const { images } = useTheme<Theme>();
  const [activeTag, setActiveTag] = useState("Hotels");
  const [aiQuery, setAiQuery] = useState("");

  const drawerOpen = () => {
    navigation.navigate("DRAWER");
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleTagPress = useCallback((label: string) => {
    setActiveTag(label);
  }, []);

  const handleAiSubmit = useCallback(() => {
    if (!aiQuery.trim()) return;
    navigation.navigate("CHAT", { initialMessage: aiQuery.trim() });
    setAiQuery("");
  }, [aiQuery, navigation]);

  return (
    <Background>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* === Header === */}
        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
          <TouchableOpacity onPress={drawerOpen}>
            <Image
              source={images.menuBtn}
              style={{ height: _IMG_SIZE, width: _IMG_SIZE, resizeMode: "cover" }}
            />
          </TouchableOpacity>
          <Pressable onPress={() => navigation.navigate("NOTIFICATION")}>
            <Image
              source={images.notifiocationBtn}
              style={{ height: _IMG_SIZE, width: _IMG_SIZE, resizeMode: "cover" }}
            />
          </Pressable>
        </Box>

        {/* === AI Section === */}
        <Box paddingHorizontal="medium" marginTop="small">
          <GradientTitle style={{ fontFamily: typography.poppinsRegular, fontSize: fontSizes.md }}>
            {t("Home.askAi")}
          </GradientTitle>
          <View style={styles.aiInputRow}>
            <TextInput
              style={styles.aiInput}
              placeholder={t("Home.askMeAnything")}
              placeholderTextColor={colors.neutral400}
              value={aiQuery}
              onChangeText={setAiQuery}
              onSubmitEditing={handleAiSubmit}
              returnKeyType="send"
            />
            <TouchableOpacity style={styles.aiButton} onPress={handleAiSubmit}>
              <Image source={images.magicAiBtn} style={{ height: 22, width: 22 }} />
            </TouchableOpacity>
          </View>
        </Box>

        {/* === Tags === */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
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

        {/* === Content based on active tag === */}
        {activeTag === "Hotels" && <FeaturedHotels />}
        {activeTag === "Trips" && <PopularTrip />}
        {activeTag === "Hotels" && <PopularTrip />}
        {activeTag === "Flights" && (
          <Box
            paddingHorizontal="medium"
            marginTop="twenty"
            alignItems="center"
            justifyContent="center"
            style={{ paddingVertical: 40 }}>
            <Icon name="airplane-outline" size={48} color={colors.neutral400} />
            <GradientTitle style={{ fontSize: fontSizes.lg, marginTop: 12 }}>
              Flight search coming soon
            </GradientTitle>
          </Box>
        )}
      </ScrollView>
    </Background>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100,
  },
  tagList: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  aiInputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.neutral300,
    paddingHorizontal: 12,
    marginTop: 6,
    marginBottom: 4,
  },
  aiInput: {
    flex: 1,
    fontSize: fontSizes.md,
    fontFamily: typography.poppinsRegular,
    color: colors.neutral700,
    paddingVertical: 10,
  },
  aiButton: {
    padding: 6,
    marginLeft: 4,
  },
});
