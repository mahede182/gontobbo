import { images } from "@/theme/images";
import { ImageSourcePropType } from "react-native";

interface IpopularTrip {
  image: ImageSourcePropType;
  title: string;
  duration: string;
  feature: string;
  peopleJoined: number;
  avatars: ImageSourcePropType[];
}

export const popularTrip: IpopularTrip[] = [
  {
    image: images.dummyTrip1,
    title: "Buckingham Palace, London",
    duration: "5 Days Package",
    feature: "Return Flight",
    peopleJoined: 7,
    avatars: [images.avatar1, images.avatar2, images.avatar1, images.avatar2],
  },
  {
    image: images.dummyTri2,
    title: "Yosemite National Park",
    duration: "5 Days Package",
    feature: "Free Breakfast",
    peopleJoined: 14,
    avatars: [images.avatar1, images.avatar2, images.avatar1, images.avatar2],
  },
  // Add more trip data objects here
];
