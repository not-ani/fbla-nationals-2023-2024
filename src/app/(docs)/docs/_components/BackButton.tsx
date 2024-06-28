"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function BackButton() {
  return (
    <Link
      href={`/`}
      className={cn(
        buttonVariants({
          variant: "ghost",
        }),
        "items-center text-sm font-medium",
      )}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Go Home
    </Link>
  );
}
