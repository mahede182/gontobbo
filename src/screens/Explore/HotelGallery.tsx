import React, { useState } from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import Room1 from "@/assets/Explore/room1.png";
import Room2 from "@/assets/Explore/room2.png";
import Room3 from "@/assets/Explore/room3.png";
import Room4 from "@/assets/Explore/room4.png";
import { colors } from "@/theme/colors";
import { Box } from "@/theme";
import Icon from "@expo/vector-icons/MaterialIcons";
import GradientTitle from "@/components/GradientTitle";
import { typography } from "@/theme/typography";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "moti";

const { width } = Dimensions.get("window");

const HotelGallery = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("Washroom");

  const washroomImages = [Room1, Room2, Room3, Room4, Room2, Room3];
  const entranceImages = [Room1, Room2, Room3, Room4];
  const commonAreaImages = [Room1, Room2, Room3, Room4];

  const navigation = useNavigation();
  const { images } = useTheme<Theme>();

  const renderImages = (images) => (
    <FlatList
      data={images}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      renderItem={({ item }) => <Image source={item} style={styles.image} />}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Box style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={images.back} />
        </TouchableOpacity>
        <GradientTitle style={styles.gradientTitle}>{t("Explore.photosAndVideos")}</GradientTitle>
        <TouchableOpacity>
          <Icon name="favorite-border" size={24} color={colors.black100} />
        </TouchableOpacity>
      </Box>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Washroom" && styles.activeTab]}
          onPress={() => setActiveTab("Washroom")}>
          <Text style={[styles.tabText, activeTab === "Washroom" && styles.activeTabText]}>
            {t("Explore.washroom")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "Entrance" && styles.activeTab]}
          onPress={() => setActiveTab("Entrance")}>
          <Text style={[styles.tabText, activeTab === "Entrance" && styles.activeTabText]}>
            {t("Explore.entrance")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "Common Area" && styles.activeTab]}
          onPress={() => setActiveTab("Common Area")}>
          <Text style={[styles.tabText, activeTab === "Common Area" && styles.activeTabText]}>
            {t("Explore.commonArea")}
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "Washroom" && renderImages(washroomImages)}
      {activeTab === "Entrance" && renderImages(entranceImages)}
      {activeTab === "Common Area" && renderImages(commonAreaImages)}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    borderColor: colors.white200,
    borderWidth: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.white100,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: colors.blue800,
  },
  tabText: {
    fontSize: 16,
    color: colors.neutral600,
  },
  activeTabText: {
    color: colors.white,
  },
  image: {
    width: width / 2 - 16,
    height: 200,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  gradientTitle: { fontFamily: typography.poppinsMedium, fontSize: 22 },
});

export default HotelGallery;
