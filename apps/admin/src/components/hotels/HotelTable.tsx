"use client";
import { TableHead } from "../common/Table/TableHead";
import { HotelRow } from "./HotelRow";
import { useTranslation } from "react-i18next";

export const HotelTable = ({ hotels, onEdit }: any) => {
  const { t } = useTranslation();

  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr>
          <TableHead>{t("hotels.hotelName")}</TableHead>
          <TableHead>{t("hotels.location")}</TableHead>
          <TableHead>{t("hotels.rating")}</TableHead>
          <TableHead>{t("common.actions")}</TableHead>
        </tr>
      </thead>
      <tbody>
        {hotels?.map((hotel: any) => (
          <HotelRow key={hotel.id} hotel={hotel} onEdit={onEdit} />
        ))}
      </tbody>
    </table>
  );
};
