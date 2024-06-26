"use client";
import Link from "next/link";
import { memo } from "react";
import { usePathname } from "next/navigation";
import { type SidebarItemProps } from "@/types/sidebar";

const Item = ({ link, name, icon }: SidebarItemProps) => {
  const pathname = usePathname();
  const isCurrent = pathname === link;

  return (
    <Link
      href={link}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all ${isCurrent ? "bg-muted text-primary" : null} hover:text-primary `}
    >
      {icon}
      {name}
    </Link>
  );
};

export const NavItem = memo(Item);
