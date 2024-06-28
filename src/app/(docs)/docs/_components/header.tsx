import { Suspense } from "react";
import { UserMenu } from "@/components/user-menu";
import BackButton from "./BackButton";

export const Header: React.FC = () => {
  return (
    <header className="flex h-14 items-center justify-between px-4 lg:h-[60px]">
      <BackButton />
      <Suspense fallback={<div className="h-10 w-10" />}>
        <UserMenu onlySignOut={false} />
      </Suspense>
    </header>
  );
};
