import { partners } from "@/server/db/schema";
import * as z from "zod";

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  id: z.string().optional(),
  status: z.string().optional(),
  orgType: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
});

export const getpartnersSchema = searchParamsSchema;

export type GetPartnersSchema = z.infer<typeof getpartnersSchema>;

export const createPartnerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  orgType: z.enum(partners.orgType.enumValues),
  status: z.enum(partners.status.enumValues),
  availableResources: z.string(),
});

export type CreatePartnerSchema = z.infer<typeof createPartnerSchema>;

export const updatePartnerSchema = z.object({
  name: z.string().optional(),
  orgType: z.enum(partners.orgType.enumValues).optional(),
  status: z.enum(partners.status.enumValues).optional(),
  email: z.string().email().optional(),
  availableResources: z.string().optional(),
  lastInteraction: z.date().optional(),
});

export const updatePartnerSchemaFull = z.object({
  id: z.string(),
  name: z.string(),
  orgType: z.enum(partners.orgType.enumValues),
  status: z.enum(partners.status.enumValues),
  email: z.string().email(),
  availableResources: z.string(),
  lastInteraction: z.date(),
});

export type UpdatePartnerSchema = z.infer<typeof updatePartnerSchema>;
export type UpdatePartnerSchemaFull = z.infer<typeof updatePartnerSchemaFull>;
