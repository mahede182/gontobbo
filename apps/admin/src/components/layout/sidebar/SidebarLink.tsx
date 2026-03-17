"use client";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

export const SidebarLink = ({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
}) => (
  <Link href={href} className={`sidebar-link ${active ? "active" : ""}`}>
    <Icon size={18} />
    <span>{label}</span>
  </Link>
);
