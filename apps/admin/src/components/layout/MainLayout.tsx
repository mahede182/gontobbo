"use client";
import { SidebarNav } from "@/components/layout/sidebar/SidebarNav";
import { Topbar } from "./topbar/Topbar";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
export const MainLayout = ({ children }: any) => {
  const { token } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!token && pathname !== "/login") router.push("/login");
  }, [token, pathname, router]);
  if (pathname === "/login") return <>{children}</>;
  return (
    <div className="flex h-screen">
      <SidebarNav />
      <div className="flex-1 overflow-auto bg-neutral-bg">
        <Topbar />
        <main className="content-area">{children}</main>
      </div>
    </div>
  );
};
