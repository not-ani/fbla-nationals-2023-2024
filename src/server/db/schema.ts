import { relations, sql } from "drizzle-orm";
import type { Message } from "@/types/chat";
import { createInsertSchema } from "drizzle-zod";
import { createId } from "@paralleldrive/cuid2";
import {
  boolean,
  index,
  integer,
  json,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";
import { z } from "zod";

export const users = pgTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  isAdmin: boolean("isAdmin").notNull().default(false),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  interactions: many(interactions),
}));

export const accounts = pgTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = pgTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", {
      length: 255,
    })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const statusEnum = pgEnum(`status`, [
  "Verified",
  "Pending",
  "Unverified",
]);

export const orgTypeEnum = pgEnum(`org_type`, [
  "Sole Proprietorship",
  "Partnership",
  "Corporate",
  "Limited Liability Company (LLC)",
  "Cooperative",
  "NPO",
  "S Corporation",
  "Government",
  "Educational",
]);

export const interactions = pgTable("interaction", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id"),
  partnerId: text("partnerId"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").default(sql`current_timestamp`),
});

export const interactionsRelations = relations(interactions, ({ one }) => ({
  partner: one(partners, {
    fields: [interactions.partnerId],
    references: [partners.id],
  }),
  user: one(users, {
    fields: [interactions.userId],
    references: [users.id],
  }),
}));

export const partners = pgTable("partners", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar("title", { length: 256 }),
  email: varchar("email", { length: 256 }).notNull().default("test@test.com"),
  status: statusEnum("status"),
  orgType: orgTypeEnum("org_type").notNull().default("Corporate"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").default(sql`current_timestamp`),
  lastInteraction: timestamp("last_interaction")
    .notNull()
    .default(sql`now()`),
  availableResources: text("available_resources").default("None as of now"),
});

export const partnerRelations = relations(partners, ({ many }) => ({
  contacts: many(contacts),
  interactions: many(interactions),
}));

export const contacts = pgTable("contacts", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar("title", { length: 256 }),
  phone: text("phone").notNull().default("+12312313333"),
  image: text("image").default("/placeholder.png").notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  jobTitle: text("job_title").notNull(),
  isPrimary: boolean("is_primary").notNull().default(false),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
  partnerId: varchar("partner_id", { length: 191 }).notNull(),
  notes: text("notes").default("").notNull(),
});

export const contactsRelations = relations(contacts, ({ one }) => ({
  partner: one(partners, {
    fields: [contacts.partnerId],
    references: [partners.id],
  }),
}));

export const chats = pgTable("chats", {
  id: text("id").primaryKey().notNull().default(createId()),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  path: text("path").notNull(),
  messages: json("messages").array().$type<Message[]>().notNull(),
});

export type Partner = typeof partners.$inferSelect;
export type NewPartner = typeof partners.$inferInsert;

export const insertContactSchema = createInsertSchema(contacts, {
  name: z.string().min(2).max(256),
  email: (schema) => schema.email.email(),
  phone: (schema) => schema.phone.min(2),
  jobTitle: (schema) => schema.jobTitle.min(2),
  image: (schema) => schema.image.url(),
  isPrimary: (schema) => schema.isPrimary.default(false),
  notes: (schema) => schema.notes,
});

export const updateContactSchema = insertContactSchema.extend({
  id: z.string(),
});

export const createContactSchema = z.object({
  id: z.string().min(0).max(255),
  name: z.string().max(255).optional(),
  phone: z.string().default("+12312313333"),
  image: z.string().default("/placeholder.png"),
  email: z.string().email().max(256),
  jobTitle: z.string(),
  isPrimary: z.boolean().default(false),
  partnerId: z.string().max(191),
  notes: z.string().default(""),
});
