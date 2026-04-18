"use client";
import React from "react";
import { Eye, Settings, ArrowUpDown } from "lucide-react";

export const RoomRow = ({ room, onEdit }: any) => (
  <tr>
    <td>{room.id.slice(0, 4)}</td>
    <td>
      <div className="flex align-center gap-12">
        <img
          src={room.images?.[0] || "https://via.placeholder.com/150"}
          className="avatar-img"
          alt=""
        />
        <span style={{ fontWeight: 500 }}>{room.name}</span>
      </div>
    </td>
    <td>{room.hotel?.name || "Grand Hyatt"}</td>
    <td>{room.bedType || "King Bed"}</td>
    <td>
      <span style={{ fontSize: "13px" }}>{room.view || "Ocean View"}</span>
    </td>
    <td>
      <span className={`badge ${room.isAvailable ? "badge-gpay" : "badge-cash"}`}>
        {room.isAvailable ? "Available" : "Booked"}
      </span>
    </td>
    <td>
      <strong>${room.price}</strong>
    </td>
    <td>{room.maxGuests} Guests</td>
    <td>
      <div className="flex">
        <button className="action-btn" onClick={() => onEdit(room, "view")}>
          <Eye size={14} />
        </button>
        <button className="action-btn" onClick={() => onEdit(room, "edit")}>
          <Settings size={14} />
        </button>
      </div>
    </td>
  </tr>
);
