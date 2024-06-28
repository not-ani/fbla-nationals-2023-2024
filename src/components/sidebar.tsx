"use client";
import Link from "next/link";
import React from "react";

import {
  Award,
  ChevronLeft,
  ChevronRight,
  Clock4,
  Home,
  Landmark,
  LineChart,
  MapPin,
  Settings,
  TentTree,
  Users2,
} from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside
        className={`fixed inset-y-0 left-0 z-10 hidden flex-col rounded-r-xl border-r bg-background transition-transform sm:flex ${!open ? "duration-[7000000ms] w-14 transition-all ease-in" : "w-52 transition-all duration-500 ease-in-out"}`}
      >
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <div>
            {!open ? (
              <ChevronRight className="h-8 w-4" onClick={() => setOpen(true)} />
            ) : (
              <>
                <div className="flex w-full justify-end py-3">
                  {" "}
                  <span className="mx-auto my-auto h-8 items-center text-xl">
                    Timekeeper
                  </span>{" "}
                  <ChevronLeft
                    className="mx-3 h-8 w-4 "
                    onClick={() => setOpen(false)}
                  />{" "}
                </div>
                <hr />
              </>
            )}
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/home"
                  className={`flex  h-9  items-center  gap-2 text-muted-foreground    ${!open ? `${pathname !== "/dashboard/home" ? "justify-center hover:h-9 hover:w-9  hover:rounded-full hover:bg-primary hover:text-primary-foreground" : "h-9 w-9 justify-center rounded-full bg-primary text-primary-foreground "}` : `${pathname !== "/dashboard/home" ? "w-full justify-start rounded-lg px-3  hover:bg-muted hover:text-foreground" : " w-full justify-start rounded-lg bg-muted  px-3 text-primary"}`}`}
                >
                  <Home
                    className={`h-5 w-5 ${!open ? "transition-all hover:scale-110" : ""}`}
                  />
                  <span className={`${!open ? "sr-only" : "mx-1"}`}>
                    Dashboard
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className={`${open ? "sr-only" : ""}`}
              >
                Dashboard
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/employee"
                  className={`flex  h-9  items-center  gap-2 text-muted-foreground    ${!open ? `${pathname !== "/dashboard/employee" ? "justify-center hover:h-9 hover:w-9  hover:rounded-full hover:bg-primary hover:text-primary-foreground" : "h-9 w-9 justify-center rounded-full bg-primary text-primary-foreground "}` : `${pathname !== "/dashboard/employee" ? "w-full justify-start rounded-lg px-3  hover:bg-muted hover:text-foreground" : " w-full justify-start rounded-lg bg-muted  px-3 text-primary"}`}`}
                >
                  <Users2
                    className={`h-5 w-5 ${!open ? "transition-all hover:scale-110" : ""}`}
                  />
                  <span className={`${!open ? "sr-only" : "mx-1"}`}>
                    Employees
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className={`${open ? "sr-only" : ""}`}
              >
                Employees
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/attendence"
                  className={`flex  h-9  items-center  gap-2 text-muted-foreground    ${!open ? `${pathname !== "/dashboard/attendence" ? "justify-center hover:h-9 hover:w-9  hover:rounded-full hover:bg-primary hover:text-primary-foreground" : "h-9 w-9 justify-center rounded-full bg-primary text-primary-foreground"}` : `${pathname !== "/dashboard/attendence" ? "w-full justify-start rounded-lg px-3  hover:bg-muted hover:text-foreground" : " w-full justify-start rounded-lg bg-muted  px-3 text-primary"}`}`}
                >
                  <LineChart
                    className={`h-5 w-5 ${!open ? "transition-all hover:scale-110" : ""}`}
                  />
                  <span className={`${!open ? "sr-only" : "mx-1"}`}>
                    Attendance
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className={`${open ? "sr-only" : ""}`}
              >
                Attendance
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/geofence"
                  className={`flex  h-9  items-center  gap-2 text-muted-foreground    ${!open ? `${pathname !== "/dashboard/geofence" ? "justify-center hover:h-9 hover:w-9  hover:rounded-full hover:bg-primary hover:text-primary-foreground" : "h-9 w-9 justify-center rounded-full bg-primary text-primary-foreground "}` : `${pathname !== "/dashboard/geofence" ? "w-full justify-start rounded-lg px-3  hover:bg-muted hover:text-foreground" : " w-full justify-start rounded-lg bg-muted  px-3 text-primary"}`}`}
                >
                  <MapPin
                    className={`h-5 w-5 ${!open ? "transition-all hover:scale-110" : ""}`}
                  />
                  <span className={`${!open ? "sr-only" : "mx-1"}`}>
                    Geofence
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className={`${open ? "sr-only" : ""}`}
              >
                Geofence
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/shifts"
                  className={`flex  h-9  items-center  gap-2 text-muted-foreground    ${!open ? `${pathname !== "/dashboard/shifts" ? "justify-center hover:h-9 hover:w-9  hover:rounded-full hover:bg-primary hover:text-primary-foreground" : "h-9 w-9 justify-center rounded-full bg-primary text-primary-foreground "}` : `${pathname !== "/dashboard/shifts" ? "w-full justify-start rounded-lg px-3  hover:bg-muted hover:text-foreground" : " w-full justify-start rounded-lg bg-muted  px-3 text-primary"}`}`}
                >
                  <Clock4
                    className={`h-5 w-5 ${!open ? "transition-all hover:scale-110" : ""}`}
                  />
                  <span className={`${!open ? "sr-only" : "mx-1"}`}>
                    Shifts
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className={`${open ? "sr-only" : ""}`}
              >
                Shifts
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/leaves"
                  className={`flex  h-9  items-center  gap-2 text-muted-foreground    ${!open ? `${pathname !== "/dashboard/leaves" ? "justify-center hover:h-9 hover:w-9  hover:rounded-full hover:bg-primary hover:text-primary-foreground" : "h-9 w-9 justify-center rounded-full bg-primary  text-primary-foreground "}` : `${pathname !== "/dashboard/leaves" ? "w-full justify-start rounded-lg px-3 hover:bg-muted hover:text-foreground" : " w-full justify-start rounded-lg bg-muted px-3 text-primary"}`}`}
                >
                  <TentTree
                    className={`h-5 w-5 ${!open ? "transition-all hover:scale-110" : ""}`}
                  />
                  <span className={`${!open ? "sr-only" : "mx-1"}`}>
                    Leaves
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className={`${open ? "sr-only" : ""}`}
              >
                Leaves
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/departments"
                  className={`flex  h-9  items-center  gap-2 text-muted-foreground    ${!open ? `${pathname !== "/dashboard/departments" ? "justify-center hover:h-9 hover:w-9  hover:rounded-full hover:bg-primary hover:text-primary-foreground" : "h-9 w-9 justify-center rounded-full bg-primary text-primary-foreground"}` : `${pathname !== "/dashboard/departments" ? "w-full justify-start rounded-lg px-3 hover:bg-muted hover:text-foreground " : " w-full justify-start rounded-lg bg-muted px-3 text-primary"}`}`}
                >
                  <Landmark
                    className={`h-5 w-5 ${!open ? "transition-all hover:scale-110" : ""}`}
                  />
                  <span className={`${!open ? "sr-only" : "mx-1"}`}>
                    Departments
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className={`${open ? "sr-only" : ""}`}
              >
                Departments
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/designation"
                  className={`flex  h-9  items-center  gap-2 text-muted-foreground    ${!open ? `${pathname !== "/dashboard/designation" ? "justify-center hover:h-9 hover:w-9  hover:rounded-full hover:bg-primary hover:text-primary-foreground" : "h-9 w-9 justify-center rounded-full bg-primary text-primary-foreground "}` : `${pathname !== "/dashboard/designation" ? "w-full justify-start rounded-lg px-3 hover:bg-muted hover:text-foreground" : " w-full justify-start rounded-lg bg-muted px-3 text-primary"}`}`}
                >
                  <Award
                    className={`h-5 w-5 ${!open ? "transition-all hover:scale-110" : ""}`}
                  />
                  <span className={`${!open ? "sr-only" : "mx-1"}`}>
                    Designation
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className={`${open ? "sr-only" : ""}`}
              >
                Designation
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
    </div>
  );
}
