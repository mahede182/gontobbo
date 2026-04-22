"use client";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { MiddleSection } from "./MiddleSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useHotels } from "@/hooks/useHotels";
import { FullPageLoader } from "@/components/common/FullPageLoader";

export const DashboardContent = () => {
  const { isLoading: isStatsLoading } = useDashboardStats();
  const { isLoading: isHotelsLoading } = useHotels();

  const isLoading = isStatsLoading || isHotelsLoading;

  return (
    <>
      {isLoading && <FullPageLoader />}
      <PageHeader title="Dashboard" breadcrumb="Home > Dashboard" />
      <StatsGrid />
      <MiddleSection />
    </>
  );
};
