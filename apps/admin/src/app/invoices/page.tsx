"use client";
import { useState } from "react";
import { useInvoices } from "@/hooks/useInvoices";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { DataPageLayout } from "@/components/common/DataPageLayout";
import { useTranslation } from "react-i18next";
import type { FilterConfig } from "@/types";

export default function InvoicesPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const { invoices, meta, isLoading } = useInvoices({ page, status, limit: 10 });
  const { t } = useTranslation();

  const filters: FilterConfig[] = [
    {
      label: t("common.status"),
      value: status,
      options: [
        { label: t("invoices.allStatus"), value: "" },
        { label: t("invoices.paid"), value: "PAID" },
        { label: t("invoices.pending"), value: "PENDING" },
        { label: t("invoices.overdue"), value: "OVERDUE" },
      ],
      onChange: (v) => { setStatus(v); setPage(1); },
    },
  ];

  return (
    <DataPageLayout
      title={t("invoices.title")}
      breadcrumb={t("invoices.breadcrumb")}
      searchPlaceholder={t("invoices.searchPlaceholder")}
      filters={filters}
      totalItems={meta?.totalItems}
      currentCount={invoices?.length || 0}
      page={page}
      totalPages={meta?.totalPages}
      onPageChange={setPage}
      isLoading={isLoading}
      skeletonColumns={7}
    >
      <InvoiceTable invoices={invoices || []} />
    </DataPageLayout>
  );
}
