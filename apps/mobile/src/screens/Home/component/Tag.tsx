import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";

type Props = {
  id: string | number;
  icon: any;
  label: string;
};

const Tag = ({ icon, label, id }: Props) => {
  const [active, setActive] = useState(false);

  const handlePress = () => {
    setActive((prev) => !prev);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Box style={[styles.containerBase, { backgroundColor: active ? colors.blue800 : "#fff" }]}>
        <Image source={icon} style={styles.icon} tintColor={active ? "#fff" : "#000"} />
        <RestyleText style={[styles.labelBase, { color: active ? "#fff" : "#000" }]}>
          {label}
        </RestyleText>
      </Box>
    </TouchableOpacity>
  );
};

export default Tag;

const styles = StyleSheet.create({
  containerBase: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  labelBase: {
    fontFamily: typography.poppinsMedium,
    fontSize: 16,
  },
});
