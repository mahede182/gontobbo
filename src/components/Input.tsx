import React from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { BoxProps } from "@shopify/restyle";
import { Box, RestyleText as Text } from "../theme";
import { Theme } from "@/@types/theme.type";
import { Ionicons } from "@expo/vector-icons";

interface InputProps extends TextInputProps, BoxProps<Theme> {
  label?: string;
  error?: string;
  icon?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  ...props
}) => {
  return (
    <Box marginBottom="medium">
      {label && (
        <Text variant="textBase" color="black" marginBottom="tiny">
          {label}
        </Text>
      )}
      <Box
        flexDirection="row"
        alignItems="center"
        borderWidth={1}
        borderColor={error ? "red" : "greyLight"}
        borderRadius={8}
        padding="medium"
        backgroundColor="white"
      >
        {icon && (
          <Ionicons name={icon} size={24} color="#999" style={styles.icon} />
        )}
        <TextInput
          style={styles.input}
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

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});
