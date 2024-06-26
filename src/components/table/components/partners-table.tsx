"use client";

import * as React from "react";
import { partners, type Partner } from "@/server/db/schema";
import type { DataTableFilterField } from "@/types";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTableAdvancedToolbar } from "@/components/data-table/advanced/data-table-advanced-toolbar";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import type { getPartners } from "@/components/table/lib/queries";
import { getStatusIcon } from "@/components/table/lib/utils";
import { getColumns } from "./partners-table-columns";
import { TasksTableFloatingBar } from "./partners-table-floating-bar";
import { usePartnersTable } from "./partners-table-provider";
import { PartnersTableToolbarActions } from "./partners-table-toolbar-actions";

interface TasksTableProps {
  tasksPromise: ReturnType<typeof getPartners>;
}

export function PartnersTable({ tasksPromise }: TasksTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.
  const { featureFlags } = usePartnersTable();

  const { data, pageCount } = React.use(tasksPromise);

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), []);

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<Partner>[] = [
    {
      label: "Id",
      value: "id",
      placeholder: "Filter Ids...",
    },
    {
      label: "Name",
      value: "name",
      placeholder: "Filter Names...",
    },
    {
      label: "Status",
      value: "status",
      options: partners.status.enumValues.map((status) => ({
        label: status[0]?.toUpperCase() + status.slice(1),
        value: status,
        icon: getStatusIcon(status),
        withCount: true,
      })),
    },
    {
      label: "Organization Type",
      value: "orgType",
      options: partners.orgType.enumValues.map((priority) => ({
        label: priority[0]?.toUpperCase() + priority.slice(1),
        value: priority,
        withCount: true,
      })),
    },
  ];

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    // optional props
    filterFields,
    enableAdvancedFilter: featureFlags.includes("advancedFilter"),
    defaultPerPage: 10,
    defaultSort: "lastInteraction.desc",
  });

  return (
    <DataTable
      table={table}
      floatingBar={<TasksTableFloatingBar table={table} />}
    >
      {featureFlags.includes("advancedFilter") ? (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <PartnersTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : (
        <DataTableToolbar table={table} filterFields={filterFields}>
          <PartnersTableToolbarActions table={table} />
        </DataTableToolbar>
      )}
    </DataTable>
  );
}
