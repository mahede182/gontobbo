// Divider.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import Divider from "../components/Divider";

describe("Divider", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Divider />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the text "Divider"', () => {
    const { getByText } = render(<Divider />);
    const dividerText = getByText("Divider");
    expect(dividerText).toBeTruthy();
  });
});
