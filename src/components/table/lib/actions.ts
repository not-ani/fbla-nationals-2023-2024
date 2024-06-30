"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { eq, inArray } from "drizzle-orm";

import { getErrorMessage } from "@/lib/handle-error";

import type { CreatePartnerSchema, UpdatePartnerSchema } from "./validations";
import { type Partner, partners, interactions } from "@/server/db/schema";
import { db } from "@/server/db";
import { auth } from "@/server/auth";

export async function createPartner(input: CreatePartnerSchema) {
  noStore();
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }

    await db.transaction(async (tx) => {
      const [data] = await tx
        .insert(partners)
        .values({
          name: input.name,
          email: input.email,
          status: input.status,
          orgType: input.orgType,
          availableResources: input.availableResources,
        })
        .returning();

      await tx.insert(interactions).values({
        partnerId: data?.id,
        userId: session.user.id,
        createdAt: data?.lastInteraction,
      });
    });

    revalidatePath("/");

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function updatePartner(
  input: UpdatePartnerSchema & { id: string },
) {
  noStore();
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }

    await db.transaction(async (tx) => {
      await tx
        .update(partners)
        .set({
          name: input.name,
          status: input.status,
          orgType: input.orgType,
          availableResources: input.availableResources,
          lastInteraction: input.lastInteraction,
        })
        .where(eq(partners.id, input.id));

      if (input.lastInteraction) {
        await tx.insert(interactions).values({
          partnerId: input.id,
          userId: session.user.id,
          createdAt: input.lastInteraction,
        });
      }
    });

    revalidatePath("/");
    revalidatePath(`/partner/${input.id}`);

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function updatePartners(input: {
  ids: string[];
  status?: Partner["status"];
  orgType?: Partner["orgType"];
  lastInteraction?: Partner["lastInteraction"];
}) {
  noStore();
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }

    await db.transaction(async (tx) => {
      if (input.lastInteraction) {
        for (const id of input.ids) {
          await tx.insert(interactions).values({
            partnerId: id,
            userId: session.user.id,
            createdAt: input.lastInteraction,
          });
        }
      }

      await tx
        .update(partners)
        .set({
          status: input.status,
          orgType: input.orgType,
          lastInteraction: input.lastInteraction,
        })
        .where(inArray(partners.id, input.ids));
    });
    revalidatePath("/");

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deletePartner(input: { id: string }) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }
    await db.delete(partners).where(eq(partners.id, input.id));

    revalidatePath("/");
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deletePartners(input: { ids: string[] }) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }
    await db.delete(partners).where(inArray(partners.id, input.ids));

    revalidatePath("/");

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}
