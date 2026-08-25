// HomeScreen.test.tsx

// Mock imports
jest.mock("react-i18next", () => ({
  useTranslation: jest.fn().mockReturnValue({ t: (key: string) => key }),
}));

// jest.mock("@shopify/restyle", () => ({
//   useTheme: jest.fn().mockReturnValue({
//     images: {
//       menuBtn: require("@/assets/images/menu-btn.png"),
//       notifiocationBtn: require("@/assets/images/notification-btn.png"),
//       magicAiBtn: require("@/assets/images/magic-ai-btn.png"),
//     },
//   }),
// }));

// Add more test cases as needed
