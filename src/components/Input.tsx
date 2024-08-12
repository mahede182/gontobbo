import React from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { BoxProps, useTheme } from "@shopify/restyle";
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
  const { colors } = useTheme<Theme>();
  return (
    <Box marginBottom="medium">
      {label && (
        <Text variant="textBase" color="black100" marginBottom="tiny">
          {label}
        </Text>
      )}
      <Box
        flexDirection="row"
        alignItems="center"
        borderWidth={1}
        borderColor={error ? "danger" : "white200"}
        borderRadius={8}
        padding="medium"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        {icon && (
          <Ionicons name={icon} size={24} color="#999" style={styles.icon} />
        )}
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.neutral300}
          {...props}
        />
      </Box>
      {error && (
        <Text variant="textBase" color="danger" marginTop="tiny">
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
