import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Suspense } from "react";
import { UserMenu } from "@/components/user-menu";
import { Menu, Package2 } from "lucide-react";
import BackButton from "./BackButton";

export const Header: React.FC = () => {
  return (
    <header className="flex h-14 lg:h-[60px] items-center justify-between px-4">
      <BackButton />
      <Suspense fallback={<div className="w-10 h-10" />}>
        <UserMenu onlySignOut={false} />
      </Suspense>
    </header>
  );
};
const MobileSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
