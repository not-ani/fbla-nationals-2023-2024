import Link from "next/link";
import Image from "next/image";
import { getMenuItems } from "./links";
import { NavItem } from "./Item";

export const Sidebar = () => {
  const items = getMenuItems();
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center justify-between border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src="/connect-light.svg" alt="Logo" width={42} height={42} />
            <span className="">Connect</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {items.map((items, idx) => (
              <NavItem key={idx} {...items} />
            ))}
          </nav>
        </div>

      </div>
    </div>
  );
};
