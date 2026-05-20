"use client";
import { useState } from "react";
import { useBookings } from "@/hooks/useBookings";
import { BookingTable } from "@/components/bookings/BookingTable";
import { DataPageLayout } from "@/components/common/DataPageLayout";
import { useTranslation } from "react-i18next";
import type { FilterConfig } from "@/types";

export default function BookingsPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const { bookings, meta, isLoading, mutate } = useBookings({ page, status });
  const { t } = useTranslation();

  const filters: FilterConfig[] = [
    {
      label: t("common.status"),
      value: status,
      options: [
        { label: t("bookings.allStatus"), value: "" },
        { label: t("bookings.pending"), value: "PENDING" },
        { label: t("bookings.confirmed"), value: "CONFIRMED" },
        { label: t("bookings.cancelled"), value: "CANCELLED" },
        { label: t("bookings.completed"), value: "COMPLETED" },
      ],
      onChange: (v) => { setStatus(v); setPage(1); },
    },
  ];

  return (
    <DataPageLayout
      title={t("bookings.title")}
      breadcrumb={t("bookings.breadcrumb")}
      searchPlaceholder={t("bookings.searchPlaceholder")}
      filters={filters}
      totalItems={meta?.totalItems}
      currentCount={bookings?.length || 0}
      page={page}
      totalPages={meta?.totalPages}
      onPageChange={setPage}
      isLoading={isLoading}
      skeletonColumns={10}
    >
      <BookingTable bookings={bookings || []} mutate={mutate} />
    </DataPageLayout>
  );
}
