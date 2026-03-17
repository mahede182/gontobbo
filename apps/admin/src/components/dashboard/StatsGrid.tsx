"use client";
import { StatCard } from "./StatCard";
import { useDashboardStats } from "@/hooks/useDashboardStats";
export const StatsGrid = () => {
  const { data } = useDashboardStats();
  return (
    <div className="stats-grid">
      <StatCard
        title="Visitor"
        value={data?.data?.stats?.totalUsers || "..."}
        change="↑ 25%"
        className="card-blue"
      />
      <StatCard
        title="Bookings"
        value={data?.data?.stats?.totalBookings || "..."}
        change="↓ .5%"
        className="card-pink"
      />
      <StatCard
        title="Revenue"
        value={`$${data?.data?.stats?.totalRevenue || "0"}`}
        change="↓ 2.1%"
        className="card-red"
      />
      <StatCard
        title="Rooms"
        value={data?.data?.stats?.totalHotels || "..."}
        change="↑ 9%"
        className="card-green"
      />
    </div>
  );
};
