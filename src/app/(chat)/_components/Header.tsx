import { Suspense } from "react";
import { UserMenu } from "@/components/user-menu";
import BackButton from "@/app/(docs)/docs/_components/BackButton";

export const Header: React.FC = () => {
  return (
    <header className="flex h-14 lg:h-[60px] items-center justify-between px-4">
      <BackButton />
      <Suspense fallback={<div className="w-10 h-10" />}>
        <UserMenu onlySignOut={false} />
      </Suspense>
    </header>
  );
}
