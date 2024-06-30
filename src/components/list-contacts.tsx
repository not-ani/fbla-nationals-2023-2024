import "server-only";
import React from "react";
import { CardHeader, CardTitle, CardContent } from "./ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { db } from "@/server/db";

export const ListContacts = async ({ ids }: { ids: string[] }) => {
  const data = await db.query.contacts.findMany({
    where: (partners, { inArray }) => inArray(partners.id, ids),
  });
  return (
    <div className="">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Contacts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Primary Status</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  No Contacts With Those IDs
                </TableCell>
              </TableRow>
            )}
            {data.map((contact) => {
              return (
                <TableRow key={contact.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-medium">{contact.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>
                    {contact.isPrimary === true
                      ? "Primary Contact"
                      : "Not Primary"}
                  </TableCell>
                  <TableCell>{contact.jobTitle}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </div>
  );
};
