import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {};

const WishListScreens: React.FC<Props> = (props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>WishListScreens</Text>
    </View>
  );
};

export default WishListScreens;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
