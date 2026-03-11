import HeaderTitle from "@/components/HeaderTitle";
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
  type WishlistItem,
} from "@/store/api/wishlistApi";
import { colors } from "@/theme/colors";
import { images } from "@/theme/images";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Box, RestyleText } from "@/theme";
import { SafeAreaView, MotiView } from "moti";
import WishlistItemCard from "./components/WishlistItemCard";
import EmptyWishlist from "./components/EmptyWishlist";
import { typography } from "@/theme/typography";

type Props = {};

const WishList: React.FC<Props> = (): JSX.Element => {
  const navigation = useNavigation();
  const { data: wishlist = [], isLoading: loading } = useGetWishlistQuery();
  const [removeFromWishlistMutation] = useRemoveFromWishlistMutation();

  const handleRemove = async (id: string) => {
    try {
      await removeFromWishlistMutation(id).unwrap();
    } catch (error) {
      Alert.alert("Error", "Failed to remove item from wishlist");
    }
  };

  const handleBookNow = (item: WishlistItem) => {
    if (item.hotelId) {
      (navigation as any).navigate("HOTEL_DETAIL", {
        hotelId: item.hotelId,
      });
    }
  };

  const renderEmptyState = () => (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "timing", duration: 500 }}
      style={styles.emptyContainer}>
      <EmptyWishlist />
      <RestyleText
        variant="h2"
        fontFamily={typography.poppinsSemibold}
        color="black"
        style={styles.emptyTitle}>
        My Wishlist is Empty!
      </RestyleText>
      <RestyleText variant="caption" color="neutral500" style={styles.emptySubtitle}>
        Tab heart button to start saving{"\n"}your favorite items.
      </RestyleText>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => (navigation as any).navigate("Explore")}>
        <RestyleText variant="buttonLabel" fontFamily={typography.poppinsSemibold} color="white">
          Explore
        </RestyleText>
      </TouchableOpacity>
    </MotiView>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.primary700} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={1} backgroundColor="white100">
        <HeaderTitle title="Wishlist" />
        {wishlist.length === 0 ? (
          renderEmptyState()
        ) : (
          <FlatList
            data={wishlist}
            renderItem={({ item, index }) => (
              <WishlistItemCard
                item={item}
                index={index}
                onRemove={handleRemove}
                onBookNow={handleBookNow}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </Box>
    </SafeAreaView>
  );
};

export default WishList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white100,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  // Empty State Styles
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    marginBottom: 8,
  },
  emptySubtitle: {
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  exploreButton: {
    backgroundColor: colors.primary700,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
});
