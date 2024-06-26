import * as React from "react";
import type { SearchParams } from "@/types";

import { searchParamsSchema } from "@/components/table/lib/validations";
import { getPartners } from "@/components/table/lib/queries";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { PartnersTable } from "@/components/table/components/partners-table";
import { PartnersTableProvider } from "@/components/table/components/partners-table-provider";
import { check } from "@/lib/check-perms";

export interface IndexPageProps {
  searchParams: SearchParams;
}

export default async function Home({ searchParams }: IndexPageProps) {
  await check();
  const search = searchParamsSchema.parse(searchParams);

  const partnersPromise = getPartners(search);

  return (
    <div className="grid gap-8 px-6 pb-8 pt-6 md:py-4" id="dashboard">
      {/**
       * The `PartnersTableProvider` is use to enable some feature flags for the `PartnersTable` component.
       * Feel free to remove this, as it's not required for the `PartnersTable` component to work.
       */}
      <PartnersTableProvider>
        <React.Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
              shrinkZero
            />
          }
        >
          {/**
           * Passing promises and consuming them using React.use for triggering the suspense fallback.
           * @see https://react.dev/reference/react/use
           */}
          <PartnersTable tasksPromise={partnersPromise} />
        </React.Suspense>
      </PartnersTableProvider>
    </div>
  );
}
