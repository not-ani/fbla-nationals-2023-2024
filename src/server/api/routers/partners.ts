import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const partnersRouter = createTRPCRouter({
  getAllData: protectedProcedure.query(async ({ ctx }) => {
    const partners = await ctx.db.query.partners.findMany();
    return partners;
  }),
  byId: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const partner = await ctx.db.query.partners.findFirst({
        where: (partners, { eq }) => eq(partners.id, input.id),
        with: {
          contacts: true,
          interactions: {
            columns: {
              id: true,
              createdAt: true,
            },
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
          },
        },
      });
      return partner;
    }),
});
