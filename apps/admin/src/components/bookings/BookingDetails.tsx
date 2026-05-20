"use client";
import { InfoTile } from "./InfoTile";
import { useTranslation } from "react-i18next";

export const BookingDetails = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t("bookingDetails.bookingDetails")}</h2>
      <InfoTile label={t("bookings.id")} value="#LH-2546" />
    </div>
  );
};
