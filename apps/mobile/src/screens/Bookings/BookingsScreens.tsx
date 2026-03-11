import HeaderTitle from "@/components/HeaderTitle";
import { colors } from "@/theme/colors";
import { images } from "@/theme/images";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Box } from "@/theme";

type Props = {};

const BookingsScreens: React.FC<Props> = (): JSX.Element => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Bookings</Text>
    </View>
  );
};

export default BookingsScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
