import { TableHead } from "../common/Table/TableHead";
import { HotelRow } from "./HotelRow";

export const HotelTable = ({ hotels, onEdit }: any) => (
  <table className="w-full border-collapse text-left">
    <thead>
      <tr>
        <TableHead>Hotel Name</TableHead>
        <TableHead>Location</TableHead>
        <TableHead>Rating</TableHead>
        <TableHead>Actions</TableHead>
      </tr>
    </thead>
    <tbody>
      {hotels?.map((hotel: any) => (
        <HotelRow key={hotel.id} hotel={hotel} onEdit={onEdit} />
      ))}
    </tbody>
  </table>
);
