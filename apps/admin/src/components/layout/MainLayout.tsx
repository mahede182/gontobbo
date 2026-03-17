import { SidebarNav } from "@/components/layout/sidebar/SidebarNav";
import { Topbar } from "./topbar/Topbar";
export const MainLayout = ({ children }: any) => (
  <div className="flex">
    <SidebarNav />
    <div className="flex-1">
      <Topbar />
      <main className="content-area">{children}</main>
    </div>
  </div>
);
