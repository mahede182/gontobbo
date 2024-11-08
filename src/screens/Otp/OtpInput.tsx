// OtpInput.tsx
import React, { useRef, useEffect } from "react";
import { TextInput, StyleSheet } from "react-native";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";

// type Props = {
//   value: string;
//   index: number;
//   onChange: (index: number, value: string) => void;
//   // Add other props as needed
// };

const OtpInput = ({ value, index, onChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (value.length === 1) {
      const nextInput = inputRef.current?.nextSibling;
      if (nextInput && nextInput instanceof HTMLInputElement) {
        nextInput.focus();
      }
    }
  }, [value]);

  const handleChange = (e) => {
    const { value } = e.target;
    const regex = /^[0-9]$/;
    if (regex.test(value) || value === "") {
      onChange(index, value);
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
    ...typography.body,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 4,
    width: 48,
    textAlign: "center",
    // Add other styles as needed
  },
});
