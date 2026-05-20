"use client";
import { TableCell } from "../common/Table/TableCell";
import { deleteOffer } from "@/hooks/useOffers";
import { useTranslation } from "react-i18next";

export const OfferRow = ({ offer, mutate }: any) => {
  const { t } = useTranslation();

  const handleDelete = async () => {
    if (confirm(t("common.areYouSure"))) {
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
          {offer.isActive ? t("common.active") : t("common.inactive")}
        </span>
      </TableCell>
      <TableCell>
        <button className="text-danger" onClick={handleDelete}>
          {t("common.delete")}
        </button>
      </TableCell>
    </tr>
  );
};
