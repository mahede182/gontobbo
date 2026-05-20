"use client";
import React from "react";
import { Eye, Settings } from "lucide-react";
import type { Guest } from "@/types";
import { useTranslation } from "react-i18next";

export const GuestRow = ({ guest }: { guest: Guest }) => {
  const { t } = useTranslation();

  return (
    <tr>
      <td>
        <div className="flex align-center gap-12">
          <img
            src={guest.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(guest.firstName + " " + guest.lastName)}&background=499dd2&color=fff&size=36`}
            className="avatar-img"
            alt=""
          />
          <span style={{ fontWeight: 500 }}>
            {guest.firstName} {guest.lastName}
          </span>
        </div>
      </td>
      <td>{guest.email}</td>
      <td>{guest.phone || "—"}</td>
      <td>
        <strong>{guest.totalBookings}</strong>
      </td>
      <td>{guest.lastVisit ? new Date(guest.lastVisit).toLocaleDateString("en-GB") : "—"}</td>
      <td>
        <span className={`badge ${guest.isActive ? "badge-active" : "badge-inactive"}`}>
          {guest.isActive ? t("common.active") : t("common.inactive")}
        </span>
      </td>
      <td>
        <div className="flex">
          <button className="action-btn" aria-label="View">
            <Eye size={14} />
          </button>
          <button className="action-btn" aria-label="Settings">
            <Settings size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};
