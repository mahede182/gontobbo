import {
  createRestyleFunction,
  createRestyleComponent,
} from "@shopify/restyle";
const transparency = createRestyleFunction({
  property: "transparency",
  styleProperty: "opacity",
  transform: ({ value }: { value: number }) => value,
});

export const RestyleTransparent = createRestyleComponent([transparency]);
