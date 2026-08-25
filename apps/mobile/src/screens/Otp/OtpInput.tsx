import React, { useRef } from "react";
import { TextInput, StyleSheet } from "react-native";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";

type Props = {
  value: string;
  index: number;
  onChange: (index: number, value: string) => void;
  // Add other props as needed
};

const OtpInput = ({ value, index, onChange }: Props) => {
  const inputRef = useRef<TextInput>(null);

  const handleChange = (text: string) => {
    const regex = /^[0-9]$/;
    if (regex.test(text) || text === "") {
      onChange(index, text);
    }
  };

  return (
    <TextInput
      ref={inputRef}
      value={value}
      maxLength={1}
      style={styles.input}
      keyboardType="numeric"
      onChangeText={handleChange}
    />
  );
};

export default OtpInput;
const styles = StyleSheet.create({
  input: {
    fontFamily: typography.poppinsRegular,
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 4,
    width: 48,
    textAlign: "center",
    // Add other styles as needed
  },
});
