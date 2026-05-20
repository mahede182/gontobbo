"use client";
import React from "react";
import { useReports } from "@/hooks/useReports";
import { PageHeader } from "@/components/layout/PageHeader";
import { DollarSign, Calendar, TrendingUp, ShoppingCart, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  color,
  vsLabel,
}: {
  title: string;
  value: string;
  change: number;
  icon: any;
  color: string;
  vsLabel: string;
}) => {
  const isPositive = change >= 0;
  return (
    <div className="card report-stat-card">
      <div className="flex justify-between align-center">
        <div>
          <p className="report-stat-label">{title}</p>
          <h3 className="report-stat-value">{value}</h3>
          <div className="flex align-center gap-8" style={{ marginTop: "8px" }}>
            {isPositive ? (
              <ArrowUpRight size={14} style={{ color: "var(--color-success)" }} />
            ) : (
              <ArrowDownRight size={14} style={{ color: "var(--color-danger)" }} />
            )}
            <span
              className="report-stat-change"
              style={{ color: isPositive ? "var(--color-success)" : "var(--color-danger)" }}
            >
              {isPositive ? "+" : ""}{change}%
            </span>
            <span className="report-stat-period">{vsLabel}</span>
          </div>
        </div>
        <div className="report-stat-icon" style={{ background: `${color}15`, color }}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
};

export default function ReportsPage() {
  const { report, isLoading } = useReports();
  const { t } = useTranslation();

  const stats = [
    {
      title: t("reports.totalRevenue"),
      value: `$${(report?.totalRevenue || 0).toLocaleString()}`,
      change: report?.revenueChange || 0,
      icon: DollarSign,
      color: "#499dd2",
    },
    {
      title: t("reports.totalBookings"),
      value: String(report?.totalBookings || 0),
      change: report?.bookingsChange || 0,
      icon: Calendar,
      color: "#47b881",
    },
    {
      title: t("reports.occupancyRate"),
      value: `${report?.occupancyRate || 0}%`,
      change: report?.occupancyChange || 0,
      icon: TrendingUp,
      color: "#f39b65",
    },
    {
      title: t("reports.avgOrderValue"),
      value: `$${(report?.avgOrderValue || 0).toFixed(2)}`,
      change: report?.avgOrderChange || 0,
      icon: ShoppingCart,
      color: "#a855f7",
    },
  ];

  return (
    <div>
      <PageHeader title={t("reports.title")} breadcrumb={t("reports.breadcrumb")} />

      {/* Stat Cards */}
      <div className="report-stats-grid">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} vsLabel={t("common.vsLastMonth")} />
        ))}
      </div>

      {/* Monthly Revenue Table */}
      <div className="card" style={{ marginTop: "24px" }}>
        <h3 className="report-section-title">{t("reports.monthlyRevenue")}</h3>
        {isLoading ? (
          <div className="report-loading">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton-bar" style={{ height: "48px", marginBottom: "8px" }} />
            ))}
          </div>
        ) : report?.monthlyRevenue && report.monthlyRevenue.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>{t("reports.month")}</th>
                <th>{t("reports.revenue")}</th>
                <th>{t("reports.bookings")}</th>
              </tr>
            </thead>
            <tbody>
              {report.monthlyRevenue.map((row: any) => (
                <tr key={row.month}>
                  <td>{row.month}</td>
                  <td><strong>${row.revenue?.toLocaleString()}</strong></td>
                  <td>{row.bookings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon"><TrendingUp size={32} /></div>
            <h3 className="empty-state-title">{t("reports.noReportData")}</h3>
            <p className="empty-state-desc">{t("reports.revenueDataWillAppear")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
