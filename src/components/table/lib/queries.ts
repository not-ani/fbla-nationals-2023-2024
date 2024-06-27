/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import { partners, type Partner } from "@/server/db/schema";
import type { DrizzleWhere } from "@/types";
import {
  and,
  asc,
  count,
  desc,
  gte,
  lte,
  or,
  sql,
  type SQL,
} from "drizzle-orm";

import { filterColumn } from "@/lib/filter-column";

import { type GetPartnersSchema } from "./validations";
import { db } from "@/server/db";

export async function getPartners(input: GetPartnersSchema) {
  noStore();
  const {
    page,
    per_page,
    id,
    sort,
    name,
    status,
    orgType,
    operator,
    from,
    to,
  } = input;

  try {
    // Offset to paginate the results
    const offset = (page - 1) * per_page;
    // Column and order to sort by
    // Spliting the sort string by "." to get the column and order
    // Example: "title.desc" => ["title", "desc"]
    const [column, order] = (sort?.split(".").filter(Boolean) ?? [
      "lastInteraction",
      "desc",
    ]) as [keyof Partner | undefined, "asc" | "desc" | undefined];

    // Convert the date strings to date objects
    const fromDay = from ? sql`to_date(${from}, 'yyyy-mm-dd')` : undefined;
    const toDay = to ? sql`to_date(${to}, 'yyy-mm-dd')` : undefined;

    const expressions: (SQL<unknown> | undefined)[] = [
      name
        ? filterColumn({
          column: partners.name,
          value: name,
        })
        : undefined,
      id ? filterColumn({ column: partners.id, value: id }) : undefined,
      // Filter partners by status
      !!status
        ? filterColumn({
          column: partners.status,
          value: status,
          isSelectable: true,
        })
        : undefined,
      // Filter partners by priority
      !!orgType
        ? filterColumn({
          column: partners.orgType,
          value: orgType,
          isSelectable: true,
        })
        : undefined,

      // Filter by createdAt
      fromDay && toDay
        ? and(
          gte(partners.lastInteraction, fromDay),
          lte(partners.lastInteraction, toDay),
        )
        : undefined,
    ];
    const where: DrizzleWhere<Partner> =
      !operator || operator === "and"
        ? and(...expressions)
        : or(...expressions);

    // Transaction is used to ensure both queries are executed in a single transaction
    const { data, total } = await db.transaction(async (tx) => {
      const data = await tx
        .select()
        .from(partners)
        .limit(per_page)
        .offset(offset)
        .where(where)
        .orderBy(
          column && column in partners
            ? order === "asc"
              ? asc(partners[column])
              : desc(partners[column])
            : desc(partners.id),
        );

      const total = await tx
        .select({
          count: count(),
        })
        .from(partners)
        .where(where)
        .execute()
        .then((res) => res[0]?.count ?? 0);

      return {
        data,
        total,
      };
    });

    const pageCount = Math.ceil(total / per_page);
    return { data, pageCount };
  } catch (err) {
    return { data: [], pageCount: 0 };
  }
}

export async function getPartnerCountByStatus() {
  noStore();
  try {
    return await db
      .select({
        status: partners.status,
        count: count(),
      })
      .from(partners)
      .groupBy(partners.status)
      .execute();
  } catch (err) {
    return [];
  }
}

export async function getPartnerCountByPriority() {
  noStore();
  try {
    return await db
      .select({
        priority: partners.status,
        count: count(),
      })
      .from(partners)
      .groupBy(partners.status)
      .execute();
  } catch (err) {
    return [];
  }
}

export async function getAllData() {
  const data = await db.select().from(partners);
  return { data: data };
}

export type AllData = Awaited<ReturnType<typeof getAllData>>["data"];
