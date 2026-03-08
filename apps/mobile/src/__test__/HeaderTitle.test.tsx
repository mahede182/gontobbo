import React from "react";
import renderer from "react-test-renderer";
import HeaderTitle from "../components/HeaderTitle";

describe("HeaderTitle", () => {
  it("renders correctly with default props", () => {
    const tree = renderer.create(<HeaderTitle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with custom title prop", () => {
    const tree = renderer.create(<HeaderTitle title="Custom Title" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
