import { type SQL } from "drizzle-orm";
import type { ReactNode } from "react";

export type SearchParams = Record<string, string | string[] | undefined>;

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: Option[];
}

export interface DataTableFilterOption<TData> {
  id: string;
  label: string;
  value: keyof TData;
  options: Option[];
  filterValues?: string[];
  filterOperator?: string;
  isMulti?: boolean;
}

export type DrizzleWhere<T> =
  | SQL<unknown>
  | ((aliases: T) => SQL<T> | undefined);


export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}


export type MainNavItem = NavItem


export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: ReactNode
} & (
    | {
      href: string
      items?: never
    }
    | {
      href?: string
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items: any[]
    }
  )

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}
