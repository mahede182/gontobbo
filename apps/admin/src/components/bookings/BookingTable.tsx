"use client";
import React from "react";
import { ArrowUpDown } from "lucide-react";
import { BookingRow } from "./BookingRow";

export const BookingTable = ({ bookings, mutate }: { bookings: any[]; mutate?: any }) => (
  <table className="data-table">
    <thead>
      <tr>
        <th>
          ID <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>
          Name <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>
          Checkin <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>
          Checkout <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>
          Proof <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>
          Payment <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>
          Amount <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>RoomNo</th>
        <th>
          Rooms <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>
          Action <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
      </tr>
    </thead>
    <tbody>
      {bookings?.map((booking) => (
        <BookingRow key={booking.id} booking={booking} />
      ))}
    </tbody>
  </table>
);
