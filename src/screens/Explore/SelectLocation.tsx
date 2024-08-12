import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { Box, RestyleText } from "@/theme";
import Icon from "@expo/vector-icons/MaterialIcons";
import GradientTitle from "@/components/GradientTitle";
import { useNavigation } from "@react-navigation/native";
import { Input } from "@/components/Input";
import { typography } from "@/theme/typography";

const LocationSelect = () => {
  const popularLocations = [
    "New York",
    "France",
    "New Zealand",
    "Prague",
    "Great Barrier Reef",
    "Las Vegas",
    "Hong Kong",
    "Barcelona",
  ];

  const renderItem = ({ item }) => (
    <View style={styles.locationItem}>
      <Image
        style={{ marginRight: 5 }}
        source={require("@/assets/Explore/locIcon.png")}
      />
      <RestyleText style={styles.locationText}>{item}</RestyleText>
    </View>
  );

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* === Header === */}
      <Box flexDirection={"row"} alignItems={"center"} marginBottom={"medium"}>
        <Box
          style={{ height: 32, width: 32, marginRight: 10 }}
          alignItems="center"
          justifyContent="center"
          borderRadius={32}
          borderColor="white200"
          borderWidth={1}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={colors.black100} />
          </TouchableOpacity>
        </Box>
        <GradientTitle variant="gradientTitle">Location Select</GradientTitle>
        {/* <RestyleText variant="h2">Location Select</RestyleText> */}
      </Box>

      <Input placeholder={"Where do you want to stay?"} />
      <Box
        justifyContent={"center"}
        backgroundColor={"white200"}
        padding={"small"}
        marginTop={"medium"}
      >
        <RestyleText variant="textBase">Popular locations</RestyleText>
      </Box>
      <FlatList
        data={popularLocations}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: spacing.large,
  },
  subtitle: {
    marginTop: spacing.small,
    marginBottom: spacing.medium,
  },

  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.small,
  },
  separator: {
    height: 1,
    backgroundColor: colors.white200,
  },
  locationText: {
    fontFamily: typography.poppinsMedium,
    fontSize: 16,
    fontWeight: "400",
    color: colors.white200,
  },
});

export default LocationSelect;
