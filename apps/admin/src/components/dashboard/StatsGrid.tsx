"use client";
import { StatCard } from "./StatCard";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useTranslation } from "react-i18next";

export const StatsGrid = () => {
  const { data } = useDashboardStats();
  const { t } = useTranslation();

  return (
    <div className="stats-grid">
      <StatCard
        title={t("dashboard.visitor")}
        value={data?.data?.stats?.totalUsers || "..."}
        change="↑ 25%"
        className="card-blue"
      />
      <StatCard
        title={t("dashboard.bookings")}
        value={data?.data?.stats?.totalBookings || "..."}
        change="↓ .5%"
        className="card-pink"
      />
      <StatCard
        title={t("dashboard.revenue")}
        value={`$${data?.data?.stats?.totalRevenue.toFixed(2) || "0"}`}
        change="↓ 2.1%"
        className="card-red"
      />
      <StatCard
        title={t("dashboard.rooms")}
        value={data?.data?.stats?.totalHotels || "..."}
        change="↑ 9%"
        className="card-green"
      />
    </div>
  );
};
