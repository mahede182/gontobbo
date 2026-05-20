"use client";
import React from "react";
import { Eye, Settings } from "lucide-react";
import type { StaffMember } from "@/types";
import { useTranslation } from "react-i18next";

export const StaffRow = ({ member }: { member: StaffMember }) => {
  const { t } = useTranslation();

  return (
    <tr>
      <td>
        <div className="flex align-center gap-12">
          <img
            src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.firstName + " " + member.lastName)}&background=499dd2&color=fff&size=36`}
            className="avatar-img"
            alt=""
          />
          <span style={{ fontWeight: 500 }}>
            {member.firstName} {member.lastName}
          </span>
        </div>
      </td>
      <td>{member.email}</td>
      <td>
        <span className="badge badge-dept">{member.department}</span>
      </td>
      <td>{member.role}</td>
      <td>{member.phone || "—"}</td>
      <td>
        <span className={`badge ${member.isActive ? "badge-active" : "badge-inactive"}`}>
          {member.isActive ? t("common.active") : t("common.inactive")}
        </span>
      </td>
      <td>{member.joinedAt ? new Date(member.joinedAt).toLocaleDateString("en-GB") : "—"}</td>
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
