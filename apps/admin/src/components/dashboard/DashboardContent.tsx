"use client";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { MiddleSection } from "./MiddleSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useHotels } from "@/hooks/useHotels";
import { FullPageLoader } from "@/components/common/FullPageLoader";
import { useTranslation } from "react-i18next";

export const DashboardContent = () => {
  const { isLoading: isStatsLoading } = useDashboardStats();
  const { isLoading: isHotelsLoading } = useHotels();
  const { t } = useTranslation();

  const isLoading = isStatsLoading || isHotelsLoading;

  return (
    <>
      {isLoading && <FullPageLoader />}
      <PageHeader title={t("dashboard.title")} breadcrumb={t("dashboard.breadcrumb")} />
      <StatsGrid />
      <MiddleSection />
    </>
  );
};
