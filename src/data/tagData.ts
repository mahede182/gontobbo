import hotelsIcon from "@/assets/Home/hotelTag.png";
import tripIcon from "@/assets/Home/tripTag.png";
import flightsIcon from "@/assets/Home/flightTag.png";

export interface ItagData {
  icon: any;
  label: string;
}

export const tagData: ItagData[] = [
  { icon: hotelsIcon, label: "Hotelas" },
  { icon: tripIcon, label: "Trip" },
  { icon: flightsIcon, label: "Flights" },
  { icon: tripIcon, label: "Trip" },
  { icon: hotelsIcon, label: "Hotels" },
  { icon: tripIcon, label: "Trip" },
  { icon: hotelsIcon, label: "Hotels" },
  { icon: tripIcon, label: "Trip" },
];
