// colors.ts
export const colors = {
  black: "#000000",
  black100: "#0B0B0B",

  white: "#FFFFFF",
  white100: "#F0F2F3",
  white200: "#E0E0E0",

  //primary
  primary50: "#E8F1F9",
  primary100: "#D1E3F4",
  primary200: "#BBD6EE",
  primary300: "#A4C8E9",
  primary400: "#76ACDD",
  primary500: "#499DD2",
  primary600: "#1B75C7",
  primary700: "#165E9F",

  //secondary
  secondary50: "#FDF2EC",
  secondary100: "#FCE6D9",
  secondary200: "#FAD9C5",
  secondary300: "#F9CDB2",
  secondary400: "#F6B48C",
  secondary500: "#F39B65",
  secondary600: "#F0823F",
  secondary700: "#C16933",

  // Neutral colors
  neutral50: "#FAFAFA",
  neutral100: "#F5F5F5",
  neutral200: "#EEEEEE",
  neutral300: "#E1E1E1",
  neutral400: "#CACACA",
  neutral500: "#B8B8B8",
  neutral600: "#4B4B4B",
  neutral700: "#1F1F1F",

  dropdownBg: "#f0f0f0",
  dropdownBorder: "#cccccc",

  sloganColor: "#666666",

  tabSelected: "#165E9F",
  tabUnselected: "#8E8E8E",

  tabBarBg: "#FAFAFA",

  linearStart: "#3A70E2",
  linearEnd: "#F0823F",

  blue100: "#F2F8FD",
  blue200: "#E3EEFB",
  blue300: "#C1DEF6",
  blue400: "#8BC2EE",
  blue500: "#4DA3E3",
  blue600: "#2587D2",
  blue700: "#176AB2",
  blue800: "#165E9F",

  danger: "#F64C4C",
  warning: "#FFAD0D",
  success: "#47B881",
  info: "#3B82F6",
} as const;

export type Palette = typeof colors;
