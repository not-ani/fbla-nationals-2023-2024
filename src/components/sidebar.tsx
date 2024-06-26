"use client";
import Link from "next/link"
import React from 'react'

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
} from "lucide-react"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";


export function Sidebar() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className={`fixed rounded-r-xl inset-y-0 left-0 z-10 hidden flex-col border-r bg-background sm:flex transition-transform ${!open ? 'transition-all duration-[7000000ms] ease-in w-14' : 'transition-all duration-500 ease-in-out w-52'}`}>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <div >
            {!open ? (
              <ChevronRight className="h-8 w-4" onClick={() => setOpen(true)} />
            ) : (
              <>
                <div className="flex w-full justify-end py-3" > <span className="mx-auto my-auto text-xl h-8 items-center">Timekeeper</span>  <ChevronLeft className="h-8 w-4 mx-3 " onClick={() => setOpen(false)} /> </div>
                <hr />

              </>
            )}
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/home"
                  className={`flex  items-center  h-9  text-muted-foreground gap-2    ${!open ? `${pathname !== "/dashboard/home" ? "hover:text-primary-foreground hover:rounded-full hover:bg-primary  hover:h-9 hover:w-9 justify-center" : "text-primary-foreground rounded-full bg-primary h-9 w-9 justify-center "}` : `${pathname !== "/dashboard/home" ? 'hover:text-foreground hover:bg-muted w-full rounded-lg  justify-start px-3' : ' bg-muted w-full rounded-lg text-primary  justify-start px-3'}`}`} >
                  <Home className={`h-5 w-5 ${!open ? "transition-all hover:scale-110" : ""}`} />
                  <span className={`${!open ? 'sr-only' : 'mx-1'}`}>Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${open ? 'sr-only' : ''}`}>Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>


          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/employee"
                  className={`flex  items-center  h-9  text-muted-foreground gap-2    ${!open ? `${pathname !== "/dashboard/employee" ? "hover:text-primary-foreground hover:rounded-full hover:bg-primary  hover:h-9 hover:w-9 justify-center" : "text-primary-foreground rounded-full bg-primary h-9 w-9 justify-center "}` : `${pathname !== "/dashboard/employee" ? 'hover:text-foreground hover:bg-muted w-full rounded-lg  justify-start px-3' : ' bg-muted w-full rounded-lg text-primary  justify-start px-3'}`}`} >
                  <Users2 className={`h-5 w-5 ${!open ? "transition-all hover:scale-110" : ""}`} />
                  <span className={`${!open ? 'sr-only' : 'mx-1'}`}>Employees</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${open ? 'sr-only' : ''}`}>Employees</TooltipContent>
            </Tooltip>
          </TooltipProvider>






          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/attendence"
                  className={`flex  items-center  h-9  text-muted-foreground gap-2    ${!open ? `${pathname !== "/dashboard/attendence" ? "hover:text-primary-foreground hover:rounded-full hover:bg-primary  hover:h-9 hover:w-9 justify-center" : "text-primary-foreground rounded-full bg-primary h-9 w-9 justify-center"}` : `${pathname !== "/dashboard/attendence" ? 'hover:text-foreground hover:bg-muted w-full rounded-lg  justify-start px-3' : ' bg-muted w-full rounded-lg text-primary  justify-start px-3'}`}`} >
                  <LineChart className={`h-5 w-5 ${!open ? "transition-all hover:scale-110" : ""}`} />
                  <span className={`${!open ? 'sr-only' : 'mx-1'}`}>Attendance</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${open ? 'sr-only' : ''}`}>Attendance</TooltipContent>
            </Tooltip>
          </TooltipProvider>


          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/geofence"
                  className={`flex  items-center  h-9  text-muted-foreground gap-2    ${!open ? `${pathname !== "/dashboard/geofence" ? "hover:text-primary-foreground hover:rounded-full hover:bg-primary  hover:h-9 hover:w-9 justify-center" : "text-primary-foreground rounded-full bg-primary h-9 w-9 justify-center "}` : `${pathname !== "/dashboard/geofence" ? 'hover:text-foreground hover:bg-muted w-full rounded-lg  justify-start px-3' : ' bg-muted w-full rounded-lg text-primary  justify-start px-3'}`}`} >
                  <MapPin className={`h-5 w-5 ${!open ? "transition-all hover:scale-110" : ""}`} />
                  <span className={`${!open ? 'sr-only' : 'mx-1'}`}>Geofence</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${open ? 'sr-only' : ''}`}>Geofence</TooltipContent>
            </Tooltip>
          </TooltipProvider>



          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/shifts"
                  className={`flex  items-center  h-9  text-muted-foreground gap-2    ${!open ? `${pathname !== "/dashboard/shifts" ? "hover:text-primary-foreground hover:rounded-full hover:bg-primary  hover:h-9 hover:w-9 justify-center" : "text-primary-foreground rounded-full bg-primary h-9 w-9 justify-center "}` : `${pathname !== "/dashboard/shifts" ? 'hover:text-foreground hover:bg-muted w-full rounded-lg  justify-start px-3' : ' bg-muted w-full rounded-lg text-primary  justify-start px-3'}`}`} >
                  <Clock4 className={`h-5 w-5 ${!open ? "transition-all hover:scale-110" : ""}`} />
                  <span className={`${!open ? 'sr-only' : 'mx-1'}`}>Shifts</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${open ? 'sr-only' : ''}`}>Shifts</TooltipContent>
            </Tooltip>
          </TooltipProvider>



          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/leaves"
                  className={`flex  items-center  h-9  text-muted-foreground gap-2    ${!open ? `${pathname !== "/dashboard/leaves" ? "hover:text-primary-foreground hover:rounded-full hover:bg-primary  hover:h-9 hover:w-9 justify-center" : "text-primary-foreground rounded-full bg-primary h-9 w-9  justify-center "}` : `${pathname !== "/dashboard/leaves" ? 'hover:text-foreground hover:bg-muted w-full rounded-lg justify-start px-3' : ' bg-muted w-full rounded-lg text-primary justify-start px-3'}`}`} >
                  <TentTree className={`h-5 w-5 ${!open ? "transition-all hover:scale-110" : ""}`} />
                  <span className={`${!open ? 'sr-only' : 'mx-1'}`}>Leaves</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${open ? 'sr-only' : ''}`}>Leaves</TooltipContent>
            </Tooltip>
          </TooltipProvider>



          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/departments"
                  className={`flex  items-center  h-9  text-muted-foreground gap-2    ${!open ? `${pathname !== "/dashboard/departments" ? "hover:text-primary-foreground hover:rounded-full hover:bg-primary  hover:h-9 hover:w-9 justify-center" : "text-primary-foreground rounded-full bg-primary h-9 w-9 justify-center"}` : `${pathname !== "/dashboard/departments" ? 'hover:text-foreground hover:bg-muted w-full rounded-lg justify-start px-3 ' : ' bg-muted w-full rounded-lg text-primary justify-start px-3'}`}`} >
                  <Landmark className={`h-5 w-5 ${!open ? "transition-all hover:scale-110" : ""}`} />
                  <span className={`${!open ? 'sr-only' : 'mx-1'}`}>Departments</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${open ? 'sr-only' : ''}`}>Departments</TooltipContent>
            </Tooltip>
          </TooltipProvider>




          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/designation"
                  className={`flex  items-center  h-9  text-muted-foreground gap-2    ${!open ? `${pathname !== "/dashboard/designation" ? "hover:text-primary-foreground hover:rounded-full hover:bg-primary  hover:h-9 hover:w-9 justify-center" : "text-primary-foreground rounded-full bg-primary h-9 w-9 justify-center "}` : `${pathname !== "/dashboard/designation" ? 'hover:text-foreground hover:bg-muted w-full rounded-lg justify-start px-3' : ' bg-muted w-full rounded-lg text-primary justify-start px-3'}`}`} >
                  <Award className={`h-5 w-5 ${!open ? "transition-all hover:scale-110" : ""}`} />
                  <span className={`${!open ? 'sr-only' : 'mx-1'}`}>Designation</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${open ? 'sr-only' : ''}`}>Designation</TooltipContent>
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

  )
}
