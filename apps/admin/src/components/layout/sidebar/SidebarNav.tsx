"use client";
import {
  LayoutDashboard,
  FileText,
  Users,
  User,
  DoorOpen,
  Calendar,
  FileSpreadsheet,
  Utensils,
  PlusCircle,
  ClipboardList,
} from "lucide-react";
import { SidebarLink } from "./SidebarLink";
import { Logo } from "./Logo";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export const SidebarNav = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const { t } = useTranslation();

  return (
    <nav className="sidebar">
      <div className="p-24">
        <Logo />
      </div>

      <div className="sidebar-section-title">{t("sidebar.main")}</div>
      <SidebarLink href="/" label={t("sidebar.dashboard")} icon={LayoutDashboard} active={isActive("/")} />
      <SidebarLink href="/reports" label={t("sidebar.report")} icon={FileText} active={isActive("/reports")} />

      <div className="sidebar-section-title">{t("sidebar.apps")}</div>
      <SidebarLink href="/staff" label={t("sidebar.staff")} icon={Users} active={isActive("/staff")} />

      <div className="sidebar-section-title">{t("sidebar.hotelResort")}</div>
      <SidebarLink href="/guests" label={t("sidebar.guest")} icon={User} active={isActive("/guests")} />
      <SidebarLink href="/rooms" label={t("sidebar.rooms")} icon={DoorOpen} active={isActive("/rooms")} />
      <SidebarLink
        href="/bookings"
        label={t("sidebar.bookings")}
        icon={Calendar}
        active={isActive("/bookings")}
      />
      <SidebarLink
        href="/invoices"
        label={t("sidebar.invoice")}
        icon={FileSpreadsheet}
        active={isActive("/invoices")}
      />

      <div className="sidebar-section-title">{t("sidebar.restaurant")}</div>
      <SidebarLink
        href="/orders"
        label={t("sidebar.orders")}
        icon={ClipboardList}
        active={isActive("/orders")}
      />
    </nav>
  );
};
