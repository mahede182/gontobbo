import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Box } from "@/theme";
import GradientTitle from "@/components/GradientTitle";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@/theme/colors";

type Props = {
  title: string;
};

const HeaderTitle = (props: Props) => {
  const { images } = useTheme<Theme>();
  const navigation = useNavigation();
  return (
    <Box style={styles.headerContainer}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={images.back} />
      </TouchableOpacity>
      {/* Title */}
      <GradientTitle variant="gradientTitle">{props.title}</GradientTitle>
    </Box>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 20,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    borderColor: colors.greyLight,
    borderWidth: 1,
  },
});
