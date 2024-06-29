import { createTRPCRouter, protectedProcedure } from "../trpc";
import { contacts, createContactSchema } from "@/server/db/schema";

export const contactRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createContactSchema.omit({
      id: true,
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(contacts).values(input);
    }),

});
