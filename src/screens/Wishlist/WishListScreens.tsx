import HeaderTitle from "@/components/HeaderTitle";
import { wishlistItems } from "@/data/wishlistItem";
import { colors } from "@/theme/colors";
import { images } from "@/theme/images";
import { dynamicCSS } from "@/utils/styles";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
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
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitle title="Wish list" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {wishlistItems.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <Image source={images.dummyCard} style={styles.image} />
              <View style={styles.detailsContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.location}>{item.location}</Text>
                <Text style={styles.price}>${item.price.toLocaleString()}</Text>
              </View>
              <View style={dynamicCSS("flexDirection", "column")}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("TRIP_REVIEW_BOOKING");
                  }}
                  style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => alert("Delete wish list")}
                  style={styles.deleteButton}>
                  <Image source={images.bin} style={styles.deleteIcon} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary600,
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
