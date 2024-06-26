import "server-only"
import React from 'react'
import { CardHeader, CardTitle, CardContent } from './ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';
import { db } from '@/server/db';

export const ListPartners = async ({
  ids
}: {
  ids: string[];
}) => {
  const data = await db.query.partners.findMany({
    where: (partners, { inArray }) => inArray(partners.id, ids)
  })
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Partners</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Organization Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-gray-500"
                >
                  No Partners With Those IDs
                </TableCell>
              </TableRow>
            )}
            {data.map((partner) => {
              return (
                <TableRow key={partner.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-medium">{partner.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{partner.email}</TableCell>
                  <TableCell>{partner.name}</TableCell>
                  <TableCell>{partner.orgType}</TableCell>
                  <TableCell>{partner.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </div>
  )
}
