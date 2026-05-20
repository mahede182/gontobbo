"use client";
import { TableCell } from "../common/Table/TableCell";
import { useTranslation } from "react-i18next";

export const HotelRow = ({ hotel, onEdit }: any) => {
  const { t } = useTranslation();

  return (
    <tr>
      <TableCell>{hotel.name}</TableCell>
      <TableCell>{hotel.location}</TableCell>
      <TableCell>{hotel.starRating} {t("common.stars")}</TableCell>
      <TableCell>
        <button className="text-primary" onClick={() => onEdit(hotel)}>
          {t("common.edit")}
        </button>
      </TableCell>
    </tr>
  );
};
