import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/utils/baseQuery";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auth",
    "Hotels",
    "Bookings",
    "Flights",
    "Trips",
    "Users",
    "Wishlist",
    "Notifications",
    "Payments",
    "Reviews",
    "Searches",
    "Locations",
    "Chat",
  ],
  endpoints: () => ({}),
});
