"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/lib/use-sidebar";

export type SidebarProps = React.ComponentProps<"div">;

export function Sidebar({ className, children }: SidebarProps) {
  const { isSidebarOpen, isLoading } = useSidebar();

  return (
    <div
      data-state={isSidebarOpen && !isLoading ? "open" : "closed"}
      className={cn(className, "h-full flex-col dark:bg-zinc-950")}
    >
      {children}
    </div>
  );
}
