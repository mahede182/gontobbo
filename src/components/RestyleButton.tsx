import {
  createRestyleComponent,
  composeRestyleFunctions,
  backgroundColor,
  spacing,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
} from "@shopify/restyle";
import {
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { Theme } from "@/@types/theme.type";
import { Box, RestyleText } from "@/theme";

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  backgroundColor,
]);

type Props = {
  label: string;
  onPress: () => void;
  iconSrc?: ImageSourcePropType | undefined;
  loading?: boolean;
};

const BaseButton = createRestyleComponent<
  React.ComponentProps<typeof TouchableOpacity> &
    Props &
    RestyleComponentProps<Theme>,
  Theme
>([restyleFunctions], TouchableOpacity);

const RestyleButton: React.FC<Props> = ({
  label,
  onPress,
  iconSrc,
  loading = false,
  ...props
}) => (
  <BaseButton onPress={onPress} {...props}>
    {loading ? (
      <ActivityIndicator color="white100" />
    ) : (
      <Box style={styles.button}>
        {iconSrc && <Image source={iconSrc} style={styles.icon} />}
        <RestyleText variant="buttonLabel">{label}</RestyleText>
      </Box>
    )}
  </BaseButton>
);

export default RestyleButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 5,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 5,
  },
});
