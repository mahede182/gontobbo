import { Booking } from "@/@types/api.type";
import { BookingTypeFilter } from "@/screens/Bookings/components/BookingFilterTabs";
import { colors } from "@/theme/colors";

export const TABS: { key: BookingTypeFilter; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "HOTEL", label: "Hotel" },
  { key: "TRIP", label: "Trip" },
];

export interface BookingStatusProps {
  status: Booking["status"];
}

export const STATUS_CONFIG: Record<Booking["status"], { label: string; bg: string; text: string }> =
  {
    PENDING: { label: "Pending", bg: colors.warning + "25", text: colors.warning },
    CONFIRMED: { label: "Confirmed", bg: colors.success + "25", text: colors.success },
    CANCELLED: { label: "Cancelled", bg: colors.danger + "25", text: colors.danger },
    COMPLETED: { label: "Completed", bg: colors.primary600 + "25", text: colors.primary600 },
  };
