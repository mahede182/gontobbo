import {
  LayoutDashboard,
  FileText,
  Users,
  User,
  UserCheck,
  DoorOpen,
  Calendar,
  FileSpreadsheet,
  Utensils,
  PlusCircle,
  ClipboardList,
} from "lucide-react";
import { SidebarLink } from "./SidebarLink";
import { Logo } from "./Logo";
export const SidebarNav = () => (
  <nav className="sidebar">
    <div className="p-24">
      <Logo />
    </div>
    <SidebarLink href="/" label="Dashboard" icon={LayoutDashboard} />
    <SidebarLink href="/reports" label="Report" icon={FileText} />
    <SidebarLink href="/staff" label="Staff" icon={Users} />
    <SidebarLink href="/guests" label="Guest" icon={User} />
    <SidebarLink href="/guests/details" label="Guest Details" icon={UserCheck} />
    <SidebarLink href="/rooms" label="Rooms" icon={DoorOpen} />
    <SidebarLink href="/bookings" label="Bookings" icon={Calendar} />
    <SidebarLink href="/invoices" label="Invoice" icon={FileSpreadsheet} />
    <SidebarLink href="/menu" label="Menu" icon={Utensils} />
    <SidebarLink href="/menu/add" label="Add Menu" icon={PlusCircle} />
    <SidebarLink href="/orders" label="Orders" icon={ClipboardList} />
  </nav>
);
