"use server";
import { z } from "zod";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { getErrorMessage } from "@/lib/handle-error";

const updateUserSchema = z.object({
  id: z.string(),
  isAdmin: z.boolean(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export async function updateUser(input: UpdateUserSchema) {
  noStore();
  try {
    await db
      .update(users)
      .set({
        isAdmin: input.isAdmin,
      })
      .where(eq(users.id, input.id));
    if (input.isAdmin) {
      revalidatePath("/users/admin");
    }
    revalidatePath("/users/normal");

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
