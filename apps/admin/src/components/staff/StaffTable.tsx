"use client";
import React from "react";
import { ArrowUpDown, Users } from "lucide-react";
import { StaffRow } from "./StaffRow";
import { EmptyState } from "@/components/common/EmptyState";
import { useTranslation } from "react-i18next";
import type { StaffMember } from "@/types";

export const StaffTable = ({ staff }: { staff: StaffMember[] }) => {
  const { t } = useTranslation();

  return (
    <>
      <table className="data-table">
        <thead>
          <tr>
            <th>{t("staff.name")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("staff.email")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("staff.department")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("staff.role")}</th>
            <th>{t("staff.phone")}</th>
            <th>{t("staff.status")}</th>
            <th>{t("staff.joined")} <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} /></th>
            <th>{t("common.action")}</th>
          </tr>
        </thead>
        <tbody>
          {staff?.map((member) => (
            <StaffRow key={member.id} member={member} />
          ))}
        </tbody>
      </table>
      {(!staff || staff.length === 0) && (
        <EmptyState icon={Users} title={t("staff.noStaffFound")} description={t("staff.noStaffMatch")} />
      )}
    </>
  );
};
