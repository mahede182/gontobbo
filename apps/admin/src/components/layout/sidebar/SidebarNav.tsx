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

export const SidebarNav = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sidebar">
      <div className="p-24">
        <Logo />
      </div>

      <div className="sidebar-section-title">Main</div>
      <SidebarLink href="/" label="Dashboard" icon={LayoutDashboard} active={isActive("/")} />
      <SidebarLink href="/reports" label="Report" icon={FileText} active={isActive("/reports")} />

      <div className="sidebar-section-title">Apps</div>
      <SidebarLink href="/staff" label="Staff" icon={Users} active={isActive("/staff")} />

      <div className="sidebar-section-title">Hotel | Resort</div>
      <SidebarLink href="/guests" label="Guest" icon={User} active={isActive("/guests")} />
      <SidebarLink href="/rooms" label="Rooms" icon={DoorOpen} active={isActive("/rooms")} />
      <SidebarLink
        href="/bookings"
        label="Bookings"
        icon={Calendar}
        active={isActive("/bookings")}
      />
      <SidebarLink
        href="/invoices"
        label="Invoice"
        icon={FileSpreadsheet}
        active={isActive("/invoices")}
      />

      <div className="sidebar-section-title">Restaurant</div>
      <SidebarLink
        href="/orders"
        label="Orders"
        icon={ClipboardList}
        active={isActive("/orders")}
      />
    </nav>
  );
};
