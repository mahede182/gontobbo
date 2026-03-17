import Link from "next/link";
export const SidebarLink = ({ href, label, icon: Icon }: any) => (
  <Link href={href} className="sidebar-link">
    <Icon size={20} />
    {label}
  </Link>
);
