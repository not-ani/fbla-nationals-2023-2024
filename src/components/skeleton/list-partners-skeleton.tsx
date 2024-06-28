import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export const ListPartnersSkeletonColumn = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="h-4 w-[60px]" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[120px]" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[100px]" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[140px]" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[80px]" />
    </TableCell>
  </TableRow>
);

export const ListPartnersSkeleton = () => {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Partners</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-4 w-[40px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-[60px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-[60px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-[120px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-[60px]" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <ListPartnersSkeletonColumn key={index} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </div>
  );
};
