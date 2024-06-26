"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { useState } from "react";
import SuperJSON from "superjson";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { Onborda, OnbordaProvider, type Step } from "onborda";
import { getQueryClient, api, getBaseUrl } from "./react";
import CustomCard from "@/app/_components/card";
import { SidebarProvider } from "@/lib/use-sidebar";

const steps: Step[] = [
  {
    icon: "👋",
    title: "Welcome to Connect",
    content: (
      <div>
        <p>
          Connect is a full-stack TypeScript framework that helps you build APIs
          and web apps with ease.
        </p>
      </div>
    ),
    side: "bottom",
    showControls: true,
    selector: "#dashboard",
    pointerPadding: 10,
    pointerRadius: 10,
    nextRoute: "/",
    prevRoute: "/",
  },
  {
    icon: "👋",
    title: "Filter Options",
    content: (
      <div>
        <p>
          Connect is a full-stack TypeScript framework that helps you build APIs
          and web apps with ease.
        </p>
      </div>
    ),
    side: "top",
    showControls: true,
    selector: "#actions",
    pointerPadding: 10,
    pointerRadius: 10,
    nextRoute: "/",
    prevRoute: "/",
  },
];

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          transformer: SuperJSON,
          url: getBaseUrl() + "/api/trpc",
          headers: () => {
            const headers = new Headers();
            headers.set("x-trpc-source", "nextjs-react");
            return headers;
          },
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <TooltipProvider>
            <OnbordaProvider>
              <Onborda showOnborda steps={steps} cardComponent={CustomCard}>
                <SidebarProvider>{props.children}</SidebarProvider>
              </Onborda>
            </OnbordaProvider>
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </api.Provider>
    </QueryClientProvider>
  );
}
