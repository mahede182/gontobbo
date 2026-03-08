// src/data/hotelData.ts

import { images } from "@/theme/images";

export interface HotelCardProps {
  id: string;
  image: any; // Use the correct type for your image source
  name: string;
  location: string;
  rating: number;
}

export const featuredHotels: HotelCardProps[] = [
  {
    id: "1",
    image: images.dummyCard,
    name: "Caesars Palace",
    location: "Las Vegas, United States",
    rating: 4.5,
  },
  {
    id: "2",
    image: images.dummyTrip1,
    name: "YOTEL New York",
    location: "Midtown, New York, United States",
    rating: 4.0,
  },
  {
    id: "3",
    image: images.dummyCard,
    name: "Caesars Palace",
    location: "Las Vegas, United States",
    rating: 4.5,
  },
  {
    id: "4",
    image: images.dummyCard,
    name: "YOTEL New York",
    location: "Midtown, New York, United States",
    rating: 4.0,
  },
];
