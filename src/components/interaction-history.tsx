import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/server/db";

export default async function InteractionHistory({
  partnerId,
}: {
  partnerId: string;
}) {
  const interactions = await db.query.interactions.findMany({
    where: (interactions, { eq }) => eq(interactions.id, partnerId),
    with: {
      user: {
        columns: {
          name: true,
          image: true,
        },
      },
      partner: {
        columns: {
          name: true,
        },
      },
    },
  });
  return (
    <div>
      <h2>Interactions</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Partner Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Interaction Time</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interactions.map((interaction) => (
            <TableRow key={interaction.id}>
              <TableCell>{interaction.id}</TableCell>
              <TableCell>{interaction.partner?.name}</TableCell>
              <TableCell>{interaction.user?.name}</TableCell>
              <TableCell>
                {new Date(interaction.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function InteractionHistoryWithoutFetch({
  interactions,
}: {
  interactions: Readonly<{
    id: string;
    user: {
      name: string | null;
      image: string | null;
    } | null;
    partner: {
      name: string | null;
    } | null;
  }>[];
}) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Partner Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Interaction Time</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interactions.map((interaction: any) => (
            <TableRow key={interaction.id}>
              <TableCell>{interaction.id}</TableCell>
              <TableCell>{interaction.partner.name}</TableCell>
              <TableCell>{interaction.user.name}</TableCell>
              <TableCell>
                {new Date(interaction.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
