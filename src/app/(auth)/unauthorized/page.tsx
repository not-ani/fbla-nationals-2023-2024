import { buttonVariants } from "@/components/ui/button";
import { LockIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2 p-4 text-center">
      <div className="flex flex-col gap-1">
        <LockIcon className="m-auto h-14 w-14 text-red-500" />
        <h1 className="text-3xl font-semibold tracking-tighter">
          Access Denied
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          You cannot view this page because you are not an admin.
        </p>
      </div>
      <div className="mt-4 flex w-full max-w-sm flex-col gap-2">
        <Link
          className={buttonVariants({
            variant: "outline",
            size: "lg",
          })}
          href="/sign-out"
        >
          Sign Out
        </Link>
      </div>
    </div>
  );
}
