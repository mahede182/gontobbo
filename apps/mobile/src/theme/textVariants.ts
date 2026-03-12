import { typography } from "./typography";
import { fontSizes } from "./fontSizes";

export const textVariants = {
  defaults: {
    fontFamily: typography.poppinsRegular,
    fontSize: fontSizes.md,
    fontWeight: "500",
  },
  textBase: {
    fontSize: fontSizes.lg,
  },
  buttonLabel: {
    fontFamily: typography.poppinsMedium,
    color: "white",
    fontSize: fontSizes.lg,
    fontWeight: "500",
  },
  h2: {
    fontSize: fontSizes.xxl,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: fontSizes.lg,
    fontWeight: "500",
  },
  caption: {
    fontSize: fontSizes.sm,
    fontFamily: typography.poppinsRegular,
    fontWeight: "200",
  },
  gradientTitle: {
    fontFamily: typography.poppinsSemibold,
    fontSize: fontSizes.xxl,
    fontWeight: "600",
  },
  searchHotelTitle: {
    color: "neutral700",
    fontFamily: typography.poppinsMedium,
    fontSize: fontSizes.lg,
    fontWeight: "600",
  },
  inputTitle: {
    fontFamily: typography.poppinsRegular,
    color: "neutral700",
    fontSize: fontSizes.lg,
    fontWeight: "500",
    marginBottom: "five",
  },
  thinTitle: {
    fontFamily: typography.poppinsRegular,
    fontSize: 8,
  },
};
