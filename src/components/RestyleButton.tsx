import React from "react";
import {
  createRestyleComponent,
  composeRestyleFunctions,
  backgroundColor,
  spacing,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
} from "@shopify/restyle";
import { TouchableOpacity, Image, StyleSheet, ImageSourcePropType } from "react-native";
import { Theme } from "@/@types/theme.type";
import { Box, RestyleText } from "@/theme";
import { Skeleton } from "moti/skeleton";
import { useDummyLoading } from "@/hooks/useDummyLoading";

type RestyleProps = SpacingProps<Theme> & BorderProps<Theme> & BackgroundColorProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([spacing, backgroundColor]);

type Props = {
  label: string;
  onPress: () => void;
  iconSrc?: ImageSourcePropType | undefined;
  loading?: boolean;
};

const BaseButton = createRestyleComponent<
  React.ComponentProps<typeof TouchableOpacity> & Props & RestyleComponentProps<Theme>,
  Theme
>([restyleFunctions], TouchableOpacity);

const RestyleButton: React.FC<Props> = ({ label, onPress, iconSrc, loading = false, ...props }) => {
  const { isLoading } = useDummyLoading();

  return (
    <Skeleton show={isLoading} colorMode="light" radius="square" height={43} width={"100%"}>
      <BaseButton onPress={onPress} {...props}>
        <Box style={styles.buttonContainer}>
          {iconSrc && <Image source={iconSrc} style={styles.icon} />}
          <RestyleText variant="buttonLabel">{label}</RestyleText>
        </Box>
      </BaseButton>
    </Skeleton>
  );
};

export default RestyleButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginHorizontal: 5,
    width: 14,
    height: 14,
  },
});
