// Logo.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import Logo from "./Logo";

// Mock imports
jest.mock("react-i18next", () => ({
  useTranslation: jest.fn().mockReturnValue({ t: (key: string) => key }),
}));

jest.mock("@shopify/restyle", () => ({
  useTheme: jest.fn().mockReturnValue({
    images: {
      appLogo: require("../assets/images/app-logo.png"),
    },
  }),
}));

jest.mock("react-native", () => ({
  NativeModules: {
    RNMultiEnv: {
      env: "test",
    },
  },
}));

describe("Logo", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Logo />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the app logo image", () => {
    const tree = renderer.create(<Logo />).toJSON();
    const logoImage = tree.children.find((child: any) => child.type === "Image");
    expect(logoImage).toBeTruthy();
  });

  it("renders the title text with the correct translation and environment", () => {
    const tree = renderer.create(<Logo />).toJSON();
    const titleText = tree.children.find((child: any) =>
      child.children.includes("common.gontobbo - test"),
    );
    expect(titleText).toBeTruthy();
  });

  it("renders the subtitle text with the correct translation", () => {
    const tree = renderer.create(<Logo />).toJSON();
    const subtitleText = tree.children.find((child: any) =>
      child.children.includes("common.gontobboSlogan"),
    );
    expect(subtitleText).toBeTruthy();
  });
});
