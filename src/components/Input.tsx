import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { BoxProps } from "@shopify/restyle";
import { Box, RestyleText as Text } from "../theme";
import { Theme } from "@/@types/theme.type";

interface InputProps extends TextInputProps, BoxProps<Theme> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <Box marginBottom="medium">
      {label && (
        <Text variant="textBase" color="black" marginBottom="tiny">
          {label}
        </Text>
      )}
      <Box
        borderWidth={1}
        borderColor={error ? "red" : "purpleLight"}
        borderRadius={8}
        padding="medium"
      >
        <TextInput
          style={{ fontSize: 16 }}
          placeholderTextColor="#999"
          {...props}
        />
      </Box>
      {error && (
        <Text variant="textBase" color="red" marginTop="tiny">
          {error}
        </Text>
      )}
    </Box>
  );
};
