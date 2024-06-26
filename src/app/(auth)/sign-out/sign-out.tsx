"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

export const SignOutButton = () => {
  return (
    <Button
      variant={"outline"}
      size={"lg"}
      className="h-min-[300px] w-full"
      onClick={() =>
        signOut({
          callbackUrl: "/sign-in",
        })
      }
    >
      Sign Out
    </Button>
  );
};
