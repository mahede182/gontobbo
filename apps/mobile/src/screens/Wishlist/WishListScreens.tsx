import HeaderTitle from "@/components/HeaderTitle";
import { getWishlist, removeFromWishlist, WishlistItem } from "@/api/wishlist";
import { colors } from "@/theme/colors";
import { images } from "@/theme/images";
import { dynamicCSS } from "@/utils/styles";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {};

const WishListScreens: React.FC<Props> = (props): JSX.Element => {
  const navigation = useNavigation();
  const [wishlist, setWishlist] = React.useState<WishlistItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist();
        setWishlist(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      setWishlist((prev) => prev.filter((item) => item.id !== id));
      await removeFromWishlist(id);
    } catch (error) {
      Alert.alert("Error", "Failed to remove item from wishlist");
      const data = await getWishlist();
      setWishlist(data);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary700} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitle title="Wish list" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {wishlist.map((item) => {
            const imageUrl = item.hotel?.images?.[0];
            return (
              <View key={item.id} style={styles.itemContainer}>
                <Image
                  source={imageUrl ? { uri: imageUrl } : images.dummyCard}
                  style={styles.image}
                />
                <View style={styles.detailsContainer}>
                  <Text style={styles.name}>{item.hotel?.name ?? item.name}</Text>
                  <Text style={styles.location}>{item.hotel?.location ?? ""}</Text>
                </View>
                <View style={dynamicCSS("flexDirection", "column")}>
                  {item.hotelId && (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("HOTEL_DETAIL", { hotelId: item.hotelId });
                      }}
                      style={styles.bookButton}>
                      <Text style={styles.bookButtonText}>Book</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={() => handleRemove(item.id)}
                    style={styles.deleteButton}>
                    <Image source={images.bin} style={styles.deleteIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WishListScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  content: {
    paddingVertical: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: colors.white100,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    color: colors.neutral600,
    marginTop: 5,
  },
  bookButton: {
    backgroundColor: colors.primary700,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  bookButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.neutral300,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 5,
    borderRadius: 5,
  },
  deleteIcon: {
    width: 16,
    height: 16,
    tintColor: colors.danger,
  },
});
