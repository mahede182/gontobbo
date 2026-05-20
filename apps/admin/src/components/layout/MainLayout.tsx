"use client";
import { SidebarNav } from "@/components/layout/sidebar/SidebarNav";
import { Topbar } from "./topbar/Topbar";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const MainLayout = ({ children }: any) => {
  const { token, isHydrated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect after AuthContext has fully hydrated from localStorage.
    // Without this guard, the first render sees token=null and redirects
    // before the persisted token has been read — causing auto-logout on reload.
    if (isHydrated && !token && pathname !== "/login") {
      router.push("/login");
    }
  }, [token, isHydrated, pathname, router]);

  // Let the login page render without the admin shell
  if (pathname === "/login") return <>{children}</>;

  // While context is hydrating (SSR or first client frame), show nothing
  // to prevent a flash of the login page
  if (!isHydrated) return null;

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
