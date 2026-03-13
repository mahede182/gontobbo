import hotelsIcon from "@/assets/Home/hotelTag.png";
import tripIcon from "@/assets/Home/tripTag.png";
import flightsIcon from "@/assets/Home/flightTag.png";

export interface ItagData {
  id: any;
  icon: any;
  label: string;
  active?: boolean;
}

export const TAGS_DATA: ItagData[] = [
  { id: 1, icon: hotelsIcon, label: "Hotels", active: true },
  { id: 2, icon: tripIcon, label: "Trips" },
  { id: 3, icon: flightsIcon, label: "Flights" },
];
