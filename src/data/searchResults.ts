export interface searchResultsProps {
  name: string;
  location: string;
  price: number;
  imageSource: any;
}
const searchResults: searchResultsProps[] = [
  {
    name: "Caesars Palace",
    location: "Las Vegas, United States",
    price: 130,
    imageSource: require("@/assets/Home/dummyCard.png"),
  },
  {
    name: "Seaside Suites",
    location: "Miami Beach, Florida",
    price: 450,
    imageSource: require("@/assets/Home/dummyCard.png"),
  },
  {
    name: "Caesars Palace",
    location: "Las Vegas, United States",
    price: 130,
    imageSource: require("@/assets/Home/dummyCard.png"),
  },
  {
    name: "Seaside Suites",
    location: "Miami Beach, Florida",
    price: 450,
    imageSource: require("@/assets/Home/dummyCard.png"),
  },
];

export default searchResults;
