import { DocsConfig } from "@/types"

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Guides",
      href: "/guides",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",

        },
      ],
    },
    {
      title: "Documentation",
      disabled: true,
      items: [
        {
          title: "Table Overview",
          href: "/docs/table",
          disabled: true
        },
        {
          title: "Creating & Editing Partners",
          href: "/docs/mutate-table",
          disabled: true,
        },
        {
          title: "Partners & Contacts",
          disabled: true,
          href: "/docs/partners-and-contacts",
        },
      ],
    },
    {
      title: "AI",
      disabled: true,
      items: [
        {
          title: "AI Overview",
          href: "/docs/ai",
          disabled: true,
        },
      ],
    },
    {
      title: "Database and Administration",
      items: [
        {
          title: "Getting Started",
          href: "/docs/hosting"
        },
        {
          title: "Self Hosted Backups",
          href: "/docs/backups",
        },
      ],
    },
    {
      title: "Miscellaneous",
      items: [
        {
          title: "Frequency Asked Questions",
          href: "/docs/faq",
        },
      ]
    }
  ],
}
