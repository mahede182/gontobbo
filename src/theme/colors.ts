export const colors = {
  purpleLight: "#8C6FF7",
  purplePrimary: "#5A31F4",
  purpleDark: "#165E9F",

  greenLight: "#56DCBA",
  greenPrimary: "#0ECD9D",
  greenDark: "#0A906E",

  black: "#0B0B0B",
  white: "#F0F2F3",

  greyLight: "#E0E0E0",
  greyLight2: "#F5F5F5",
  greyLight3: "#E1E1E1",

  red: "#DC3D24",
  redLight: "#E7A2A3",

  dropdownBg: "#f0f0f0",
  dropdownBorder: "#cccccc",

  sloganColor: "#666666",

  tabSelected: "#165E9F",
  tabUnselected: "#8E8E8E",

  tabBarBg: "#FAFAFA",

  linearStart: "#3A70E2",
  linearEnd: "#F0823F",
} as const;

export type Palette = typeof colors;
