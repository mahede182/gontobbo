import { typography } from "./typography";

export const textVariants = {
  defaults: {
    fontFamily: typography.poppinsRegular,
    fontSize: 14,
    fontWeight: "500",
  },
  textBase: {
    fontSize: 16,
    lineHeight: 24,
  },
  buttonLabel: {
    fontFamily: typography.poppinsMedium,
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontFamily: typography.poppinsRegular,
    fontWeight: "200",
  },
  gradientTitle: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 20,
    fontWeight: "600",
  },
  searchHotelTitle: {
    color: "neutral700",
    fontFamily: typography.poppinsMedium,
    fontSize: 16,
    fontWeight: "600",
  },
  inputTitle: {
    fontFamily: typography.poppinsRegular,
    color: "neutral700",
    fontSize: 16,
    lineHeight: "100%",
    fontWeight: "500",
    marginBottom: "five",
  },
  thinTitle: {
    fontFamily: typography.poppinsRegular,
    fontSize: 8,
  },
};
