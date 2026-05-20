"use client";
import { useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import { OrderTable } from "@/components/orders/OrderTable";
import { DataPageLayout } from "@/components/common/DataPageLayout";
import { useTranslation } from "react-i18next";
import type { FilterConfig } from "@/types";

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const { orders, meta, isLoading } = useOrders({ page, status });
  const { t } = useTranslation();

  const filters: FilterConfig[] = [
    {
      label: t("common.status"),
      value: status,
      options: [
        { label: t("orders.allStatus"), value: "" },
        { label: t("orders.pending"), value: "PENDING" },
        { label: t("orders.preparing"), value: "PREPARING" },
        { label: t("orders.delivered"), value: "DELIVERED" },
        { label: t("orders.cancelled"), value: "CANCELLED" },
      ],
      onChange: (v) => { setStatus(v); setPage(1); },
    },
  ];

  return (
    <DataPageLayout
      title={t("orders.title")}
      breadcrumb={t("orders.breadcrumb")}
      searchPlaceholder={t("orders.searchPlaceholder")}
      filters={filters}
      totalItems={meta?.totalItems}
      currentCount={orders?.length || 0}
      page={page}
      totalPages={meta?.totalPages}
      onPageChange={setPage}
      isLoading={isLoading}
      skeletonColumns={6}
    >
      <OrderTable orders={orders || []} />
    </DataPageLayout>
  );
}
