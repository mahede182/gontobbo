"use client";
import { useState } from "react";
import { useStaff } from "@/hooks/useStaff";
import { StaffTable } from "@/components/staff/StaffTable";
import { DataPageLayout } from "@/components/common/DataPageLayout";
import { useTranslation } from "react-i18next";
import type { FilterConfig } from "@/types";

export default function StaffPage() {
  const [page, setPage] = useState(1);
  const [department, setDepartment] = useState("");
  const { staff, meta, isLoading } = useStaff({ page, department, limit: 10 });
  const { t } = useTranslation();

  const filters: FilterConfig[] = [
    {
      label: t("staff.department"),
      value: department,
      options: [
        { label: t("staff.allDepartments"), value: "" },
        { label: t("staff.frontDesk"), value: "FRONT_DESK" },
        { label: t("staff.housekeeping"), value: "HOUSEKEEPING" },
        { label: t("staff.kitchen"), value: "KITCHEN" },
        { label: t("staff.management"), value: "MANAGEMENT" },
        { label: t("staff.security"), value: "SECURITY" },
      ],
      onChange: (v) => { setDepartment(v); setPage(1); },
    },
  ];

  return (
    <DataPageLayout
      title={t("staff.title")}
      breadcrumb={t("staff.breadcrumb")}
      searchPlaceholder={t("staff.searchPlaceholder")}
      filters={filters}
      totalItems={meta?.totalItems}
      currentCount={staff?.length || 0}
      page={page}
      totalPages={meta?.totalPages}
      onPageChange={setPage}
      isLoading={isLoading}
      skeletonColumns={8}
    >
      <StaffTable staff={staff || []} />
    </DataPageLayout>
  );
}
