import React, { useEffect, useState } from "react";
import { Box } from "@/theme";
import { fetchUser } from "@/utils/axios";
import "@/machine/counterMachine";

import { useTheme } from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";
import { Image, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Input } from "@/components/Input";
import PopularTrip from "./component/PopularTrip";
import { useTranslation } from "react-i18next";
import Tag from "./component/Tag";
import { tagData } from "@/data/tagData";
import FeaturedHotels from "./component/FeaturedHotels";
import GradientTitle from "@/components/GradientTitle";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";

type Props = {};

const HomeScreen: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const { images } = useTheme<Theme>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    fetchUser().then((response) => {
      const data = response.data.data;
      setName(`${data?.first_name} ${data?.last_name}`);
      setEmail(data?.email);
      setImageUrl(data?.avatar);
    });
  }, [name, email, imageUrl]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* === drawer button === */}
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <Image source={images.menuBtn} style={{ height: 48, width: 48, resizeMode: "contain" }} />
        <Image
          source={images.notifiocationBtn}
          style={{ height: 48, width: 48, resizeMode: "contain" }}
        />
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
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {/* Map over tagData and render Tag component */}
          {tagData.map((tag, index) => (
            <Tag key={index} icon={tag.icon} label={tag.label} />
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
