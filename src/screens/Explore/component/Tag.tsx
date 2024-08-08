import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { RestyleText } from "@/theme";
import { typography } from "@/theme/typography";

type Props = {
  tag: string;
};

const Tag = (props: Props) => {
  return (
    <TouchableOpacity style={styles.tagContainer}>
      <RestyleText style={styles.tag}>{props.tag}</RestyleText>
    </TouchableOpacity>
  );
};

export default Tag;

const styles = StyleSheet.create({
  tag: {
    fontFamily: typography.poppinsRegular,
    fontSize: 16,
    fontWeight: "400",
  },
  tagContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
});
