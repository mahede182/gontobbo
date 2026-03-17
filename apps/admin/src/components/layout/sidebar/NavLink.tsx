import Link from "next/link";
export const NavLink = ({ href, text }: { href: string; text: string }) => (
  <Link href={href}>{text}</Link>
);
