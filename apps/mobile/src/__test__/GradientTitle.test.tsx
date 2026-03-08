import React from "react";
import renderer from "react-test-renderer";
import GradientTitle from "@/components/GradientTitle";
import { colors } from "../theme/colors";

describe("GradientTitle", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<GradientTitle>Test Title</GradientTitle>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the text content", () => {
    const tree = renderer.create(<GradientTitle>Test Title</GradientTitle>).toJSON();
    expect(tree?.children?.some((child) => child === "Test Title")).toBeTruthy();
  });

  it("applies the gradient colors correctly", () => {
    const tree = renderer.create(<GradientTitle>Test Title</GradientTitle>).toJSON();
    const linearGradient = tree?.children?.[0];
    if (linearGradient && linearGradient.type === "View") {
      expect(linearGradient.props.colors).toEqual([colors.linearStart, colors.linearEnd]);
    } else {
      throw new Error("Unexpected tree structure");
    }
  });
});
