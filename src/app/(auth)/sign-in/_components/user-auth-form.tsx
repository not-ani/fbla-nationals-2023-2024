"use client";

import * as React from "react";
import { signIn } from "next-auth/react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Google from "@/components/icons/google";
import { ReloadIcon } from "@radix-ui/react-icons";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGoogleLoading(true);
          signIn("google", {
            callbackUrl: "/",
          }).catch(() => {
            console.error("Failed to sign in with Google");
          });
        }}
        disabled={isGoogleLoading}
      >
        {isGoogleLoading ? (
          <ReloadIcon className="size-3.5 animate-spin" aria-hidden="true" />
        ) : (
          <Google className="mr-2 h-4 w-4" />
        )}
        {"   "} Google
      </button>
    </div>
  );
}
