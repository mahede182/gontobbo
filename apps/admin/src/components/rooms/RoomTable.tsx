"use client";
import React from "react";
import { ArrowUpDown } from "lucide-react";
import { RoomRow } from "./RoomRow";

export const RoomTable = ({ rooms, onEdit }: any) => (
  <table className="data-table">
    <thead>
      <tr>
        <th>
          ID <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>
          Room Name <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>
          Hotel <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>
          Bed Type <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>
          View <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>
          Status <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>
          Price <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>
          Capacity <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {rooms?.map((room: any) => (
        <RoomRow key={room.id} room={room} onEdit={onEdit} />
      ))}
    </tbody>
  </table>
);
