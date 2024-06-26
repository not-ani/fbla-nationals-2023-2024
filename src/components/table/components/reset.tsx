"use client";
import { Cross2Icon } from "@radix-ui/react-icons";
import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

function Reset() {
  const searchParams = useSearchParams();
  // if the searchParams are empty, then there's no need to render the reset button
  if (!searchParams || !Array.from(searchParams.entries()).length) return null;

  return (
    <Button
      aria-label="Reset filters"
      variant="ghost"
      className="h-8 px-2 lg:px-3"
      asChild
    >
      <a href="/">
        Reset
        <Cross2Icon className="ml-2 size-4" aria-hidden="true" />
      </a>
    </Button>
  );
}

export default memo(Reset);
