import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { SecondarySection } from "./SecondarySection";
import { PageHeader } from "@/components/layout/PageHeader";
export const DashboardContent = () => (
  <>
    <PageHeader title="Dashboard" breadcrumb="Home > Dashboard" />
    <StatsGrid />
    <SecondarySection />
  </>
);
