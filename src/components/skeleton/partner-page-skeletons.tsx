import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export function PartnerPageSkeleton() {
  return (
    <Card className="container mx-auto my-8 h-[850px] w-[1000px] items-start overflow-y-scroll px-4 md:px-6 lg:px-8">
      <CardContent className="grid gap-8">
        <div className="flex flex-col">
          <div>
            <CardHeader className="items-start">
              <div className="flex flex-row items-start">
                <Skeleton className="h-11 w-20" />
                <Skeleton className="h-10 w-40 ml-2" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-10 w-32" />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    {[...Array(5)].map((_, index) => (
                      <TableHead key={index}>
                        <Skeleton className="h-6 w-20" />
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(3)].map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {[...Array(5)].map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <Skeleton className="h-8 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
