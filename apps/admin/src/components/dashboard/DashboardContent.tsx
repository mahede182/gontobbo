import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { MiddleSection } from "./MiddleSection";
import { PageHeader } from "@/components/layout/PageHeader";
export const DashboardContent = () => (
  <>
    <PageHeader title="Dashboard" breadcrumb="Home > Dashboard" />
    <StatsGrid />
    <MiddleSection />
  </>
);
