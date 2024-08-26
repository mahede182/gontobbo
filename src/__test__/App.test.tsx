import * as React from "react";
import renderer from "react-test-renderer";
import App from "../../App";

it(`renders correctly`, () => {
  const RANDER_TEXT = "Render Correctly!";
  const tree = renderer.create(<App>{RANDER_TEXT}</App>).toJSON();

  expect(tree).toMatchSnapshot();
});
