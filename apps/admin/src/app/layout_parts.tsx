import { SidebarNav } from "@/components/layout/sidebar/SidebarNav";
export const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="layout-root">
    <SidebarNav />
    {children}
  </div>
);
