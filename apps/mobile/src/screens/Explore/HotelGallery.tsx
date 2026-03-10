import React, { useState } from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { colors } from "@/theme/colors";
import { Box } from "@/theme";
import Icon from "@expo/vector-icons/MaterialIcons";
import GradientTitle from "@/components/GradientTitle";
import { typography } from "@/theme/typography";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "moti";
import { getHotelGallery, HotelGallery as HotelGalleryType } from "@/api/hotels";

const { width } = Dimensions.get("window");

type GalleryTab = { label: string; images: string[] };

const HotelGallery = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { hotelId } = (route.params as { hotelId: string }) || {};
  const { images: themeImages } = useTheme<Theme>();

  const [tabs, setTabs] = useState<GalleryTab[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("");

  React.useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getHotelGallery(hotelId);
        const builtTabs: GalleryTab[] = [];
        if (data.hotelImages?.length) {
          builtTabs.push({ label: "Hotel", images: data.hotelImages });
        }
        data.roomImages?.forEach((room) => {
          if (room.images?.length) {
            builtTabs.push({ label: room.roomName, images: room.images });
          }
        });
        setTabs(builtTabs);
        if (builtTabs.length > 0) setActiveTab(builtTabs[0].label);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    if (hotelId) fetchGallery();
    else setLoading(false);
  }, [hotelId]);

  const activeImages = tabs.find((t) => t.label === activeTab)?.images ?? [];

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary700} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Box style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={themeImages.back} />
        </TouchableOpacity>
        <GradientTitle style={styles.gradientTitle}>{t("Explore.photosAndVideos")}</GradientTitle>
        <TouchableOpacity>
          <Icon name="favorite-border" size={24} color={colors.black100} />
        </TouchableOpacity>
      </Box>

      {tabs.length > 0 && (
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.label}
              style={[styles.tab, activeTab === tab.label && styles.activeTab]}
              onPress={() => setActiveTab(tab.label)}>
              <Text style={[styles.tabText, activeTab === tab.label && styles.activeTabText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <FlatList
        data={activeImages}
        keyExtractor={(item, index) => `${activeTab}-${index}`}
        numColumns={2}
        renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
      />
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
