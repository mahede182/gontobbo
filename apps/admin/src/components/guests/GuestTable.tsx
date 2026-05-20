"use client";
import React from "react";
import { ArrowUpDown, User } from "lucide-react";
import { GuestRow } from "./GuestRow";
import { EmptyState } from "@/components/common/EmptyState";
import { useTranslation } from "react-i18next";
import type { Guest } from "@/types";

export const GuestTable = ({ guests }: { guests: Guest[] }) => {
  const { t } = useTranslation();

  return (
    <>
      <table className="data-table">
        <thead>
          <tr>
            <th>{t("guests.guest")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("guests.email")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("guests.phone")}</th>
            <th>{t("guests.bookings")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("guests.lastVisit")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("guests.status")}</th>
            <th>{t("common.action")}</th>
          </tr>
        </thead>
        <tbody>
          {guests?.map((guest) => (
            <GuestRow key={guest.id} guest={guest} />
          ))}
        </tbody>
      </table>
      {(!guests || guests.length === 0) && (
        <EmptyState icon={User} title={t("guests.noGuestsFound")} description={t("guests.noGuestRecords")} />
      )}
    </>
  );
};
