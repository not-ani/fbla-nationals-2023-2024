import { type SidebarItemProps } from "@/types/sidebar";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { BookIcon, Home, Users } from "lucide-react";
import { cache } from "react";

function generateMenuItems(): SidebarItemProps[] {
  const items: SidebarItemProps[] = [
    {
      link: "/",
      name: "Dashboard",
      icon: <Home className="h-4 w-4" />,
    },
    {
      link: "/users/admin",
      name: "Users",
      icon: <Users className="h-4 w-4" />,
    },
    {
      link: "/docs",
      name: "Docs",
      icon: <BookIcon className="h-4 w-4" />,
    },
    {
      link: "/docs/faq",
      name: "FAQ",
      icon: <QuestionMarkCircledIcon className="h-4 w-4" />,
    },
  ];

  return items;
}

export const getMenuItems = cache(generateMenuItems);
