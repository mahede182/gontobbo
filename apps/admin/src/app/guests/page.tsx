"use client";
import { useState } from "react";
import { useGuests } from "@/hooks/useGuests";
import { GuestTable } from "@/components/guests/GuestTable";
import { DataPageLayout } from "@/components/common/DataPageLayout";
import { useTranslation } from "react-i18next";

export default function GuestsPage() {
  const [page, setPage] = useState(1);
  const { guests, meta, isLoading } = useGuests({ page, limit: 10 });
  const { t } = useTranslation();

  return (
    <DataPageLayout
      title={t("guests.title")}
      breadcrumb={t("guests.breadcrumb")}
      searchPlaceholder={t("guests.searchPlaceholder")}
      totalItems={meta?.totalItems}
      currentCount={guests?.length || 0}
      page={page}
      totalPages={meta?.totalPages}
      onPageChange={setPage}
      isLoading={isLoading}
      skeletonColumns={7}
    >
      <GuestTable guests={guests || []} />
    </DataPageLayout>
  );
}
