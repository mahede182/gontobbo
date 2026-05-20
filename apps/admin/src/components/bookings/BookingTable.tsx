"use client";
import React from "react";
import { ArrowUpDown, Calendar } from "lucide-react";
import { BookingRow } from "./BookingRow";
import { EmptyState } from "@/components/common/EmptyState";
import { useTranslation } from "react-i18next";

export const BookingTable = ({ bookings, mutate }: { bookings: any[]; mutate?: any }) => {
  const { t } = useTranslation();

  return (
    <>
      <table className="data-table">
        <thead>
          <tr>
            <th>{t("bookings.id")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("bookings.name")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("bookings.checkin")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("bookings.checkout")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("bookings.proof")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("bookings.payment")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("bookings.amount")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("bookings.roomNo")}</th>
            <th>{t("bookings.rooms")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("common.action")}</th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </tbody>
      </table>
      {(!bookings || bookings.length === 0) && (
        <EmptyState icon={Calendar} title={t("bookings.noBookingsFound")} description={t("bookings.noBookingsMatch")} />
      )}
    </>
  );
};
