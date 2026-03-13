import { Booking } from "./api.type";

export interface BookinCardProps {
  booking: Booking & { _count?: { travellers: number } };
  onPress?: (booking: Booking) => void;
}
