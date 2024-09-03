import hotelsIcon from "@/assets/Home/hotelTag.png";
import tripIcon from "@/assets/Home/tripTag.png";
import flightsIcon from "@/assets/Home/flightTag.png";

export interface ItagData {
  id: any;
  icon: any;
  label: string;
  active?: boolean;
}

export const tagData: ItagData[] = [
  { id: 1, icon: hotelsIcon, label: "Hotels", active: true },
  { id: 2, icon: tripIcon, label: "Trip" },
  { id: 3, icon: flightsIcon, label: "Flights" },
  { id: 4, icon: tripIcon, label: "Trip" },
  { id: 5, icon: hotelsIcon, label: "Hotels" },
  { id: 6, icon: tripIcon, label: "Trip" },
  { id: 7, icon: hotelsIcon, label: "Hotels" },
  { id: 8, icon: tripIcon, label: "Trip" },
];
