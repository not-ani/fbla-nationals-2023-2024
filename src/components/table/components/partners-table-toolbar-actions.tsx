"use client";

import { type Partner } from "@/server/db/schema";
import { DownloadIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { exportTableToCSV } from "@/lib/export";
import { Button } from "@/components/ui/button";

import { CreatePartnerDialog } from "./create-partners-dialog";
import { DeletePartnersDialog } from "./delete-partners-dialog";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DateRangePicker } from "@/components/date-range-picker";

interface PartnersTableToolbarActionsProps {
  table: Table<Partner>;
}

export function PartnersTableToolbarActions({
  table,
}: PartnersTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2" id="actions">
      <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
        <DateRangePicker
          triggerSize="sm"
          triggerClassName="ml-auto w-56 sm:w-60"
          align="end"
        />
      </React.Suspense>
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeletePartnersDialog
          partners={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
      <CreatePartnerDialog />
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: "tasks",
            excludeColumns: ["select", "actions"],
          })
        }
      >
        <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
        Export
      </Button>
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
