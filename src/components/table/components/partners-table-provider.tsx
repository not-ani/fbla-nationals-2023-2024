"use client";

import * as React from "react";

import { dataTableConfig, type DataTableConfig } from "@/config/data-table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Reset from "./reset";

type FeatureFlagValue = DataTableConfig["featureFlags"][number]["value"];

interface PartnersTableContextProps {
  featureFlags: FeatureFlagValue[];
  setFeatureFlags: React.Dispatch<React.SetStateAction<FeatureFlagValue[]>>;
}

const PartnersTableContext = React.createContext<
  PartnersTableContextProps | undefined
>(undefined);

export function usePartnersTable() {
  const context = React.useContext(PartnersTableContext);
  if (!context) {
    throw new Error(
      "usePartnersTable must be used within a PartnersTableProvider",
    );
  }
  return context;
}

export function PartnersTableProvider({ children }: React.PropsWithChildren) {
  const [featureFlags, setFeatureFlags] = React.useState<FeatureFlagValue[]>(
    [],
  );

  return (
    <PartnersTableContext.Provider
      value={{
        featureFlags,
        setFeatureFlags,
      }}
    >
      <div className="flex w-full flex-row justify-between overflow-x-auto md:overflow-y-hidden">
        <h1 className="text-3xl font-bold">Partners Table</h1>
        <ToggleGroup
          type="multiple"
          variant="outline"
          size="sm"
          value={featureFlags}
          onValueChange={(value: FeatureFlagValue[]) => setFeatureFlags(value)}
          className="w-fit"
        >
          {dataTableConfig.featureFlags.map((flag) => (
            <Tooltip key={flag.value} delayDuration={250}>
              <ToggleGroupItem
                value={flag.value}
                className="whitespace-nowrap px-3 text-xs"
                asChild
              >
                <TooltipTrigger>
                  <flag.icon
                    className="mr-2 size-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  {flag.label}
                </TooltipTrigger>
              </ToggleGroupItem>
              <TooltipContent
                align="start"
                side="bottom"
                sideOffset={6}
                className="flex max-w-60 flex-col space-y-1.5 border bg-background py-2 font-semibold text-foreground"
              >
                <div>{flag.tooltipTitle}</div>
                <div className="text-xs text-muted-foreground">
                  {flag.tooltipDescription}
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
          <Reset />
        </ToggleGroup>
      </div>
      {children}
    </PartnersTableContext.Provider>
  );
}
