import React from "react";
import renderer from "react-test-renderer";
import FavouriteScreens from "../screens/Favourite/FavouriteScreen";

it(`renders correctly`, () => {
  const tree = renderer.create(<FavouriteScreens />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).not.toBeNull();
});
