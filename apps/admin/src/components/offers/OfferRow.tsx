"use client";
import { TableCell } from "../common/Table/TableCell";
import { deleteOffer } from "@/hooks/useOffers";

export const OfferRow = ({ offer, mutate }: any) => {
  const handleDelete = async () => {
    if (confirm("Are you sure?")) {
      await deleteOffer(offer.id);
      mutate();
    }
  };

  return (
    <tr>
      <TableCell>{offer.name}</TableCell>
      <TableCell>{offer.location}</TableCell>
      <TableCell>{offer.tier1Value}</TableCell>
      <TableCell>
        <span className={offer.isActive ? "text-success" : "text-danger"}>
          {offer.isActive ? "Active" : "Inactive"}
        </span>
      </TableCell>
      <TableCell>
        <button className="text-danger" onClick={handleDelete}>
          Delete
        </button>
      </TableCell>
    </tr>
  );
};
