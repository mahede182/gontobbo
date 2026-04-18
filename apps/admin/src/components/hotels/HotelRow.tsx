"use client";
import { TableCell } from "../common/Table/TableCell";

export const HotelRow = ({ hotel, onEdit }: any) => (
  <tr>
    <TableCell>{hotel.name}</TableCell>
    <TableCell>{hotel.location}</TableCell>
    <TableCell>{hotel.starRating} Stars</TableCell>
    <TableCell>
      <button className="text-primary" onClick={() => onEdit(hotel)}>
        Edit
      </button>
    </TableCell>
  </tr>
);
