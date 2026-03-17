"use client";
import React from "react";
import { Eye, Settings, ArrowUpDown } from "lucide-react";

export const BookingRow = ({ booking }: { booking: any }) => {
  const getPaymentClass = (method: string) => {
    switch (method?.toLowerCase()) {
      case "cash":
        return "badge-cash";
      case "gpay":
        return "badge-gpay";
      case "visa":
        return "badge-visa";
      default:
        return "badge-pending";
    }
  };

  return (
    <tr>
      <td>{booking.id.slice(0, 4)}</td>
      <td>
        <div className="flex align-center gap-12">
          <img
            src={booking.user?.avatar || `https://i.pravatar.cc/150?u=${booking.user?.id}`}
            className="avatar-img"
            alt=""
          />
          <span style={{ fontWeight: 500 }}>
            {booking.user?.firstName} {booking.user?.lastName}
          </span>
        </div>
      </td>
      <td>{new Date(booking.checkIn).toLocaleDateString("en-GB")}</td>
      <td>{new Date(booking.checkOut).toLocaleDateString("en-GB")}</td>
      <td>
        <span style={{ fontSize: "12px" }}>Pan Card</span>
      </td>
      <td>
        <span className={`badge ${getPaymentClass(booking.paymentMethod || "Gpay")}`}>
          {booking.paymentMethod || "Gpay"}
        </span>
      </td>
      <td>
        <strong>${booking.totalPrice}</strong>
      </td>
      <td>
        <span style={{ color: "var(--color-secondary-500)", fontSize: "11px", fontWeight: 600 }}>
          DELUXE :{" "}
        </span>
        <span style={{ fontSize: "12px" }}>{booking.room?.name || "304"}</span>
      </td>
      <td>
        {booking.rooms} Member /{" "}
        <span style={{ color: "var(--color-primary)" }}>{booking.rooms} Room</span>
      </td>
      <td>
        <div className="flex">
          <button className="action-btn">
            <Eye size={14} />
          </button>
          <button className="action-btn">
            <Settings size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};
