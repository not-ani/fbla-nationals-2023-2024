import * as React from "react";

import { IconSeparator } from "@/components/ui/icons";
import { UserMenu } from "@/components/user-menu";
import { SidebarMobile } from "./sidebar-mobile";
import { SidebarToggle } from "@/components/chat/sidebar-toggle";
import { ChatHistory } from "./ChatHistory";
import BackButton from "@/app/(docs)/docs/_components/BackButton";
import { HomeIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";

async function UserOrLogin() {
  return (
    <>
      <>
        <SidebarMobile>
          <ChatHistory />
        </SidebarMobile>
        <SidebarToggle />
      </>
      <div className="flex items-center">
        <IconSeparator className="size-6 text-muted-foreground/50" />
        <div className="flex flex-row items-center">
          <Tooltip>
            <TooltipTrigger>
              <Link
                href="/"
                className={
                  buttonVariants({
                    variant: "ghost"
                  })
                }
              >
                <HomeIcon />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              Go Home
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserMenu />
        </React.Suspense>
      </div>
    </header>
  );
}
