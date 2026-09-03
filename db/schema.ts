import { index, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const leads = pgTable(
  "leads",
  {
    id: text("id").primaryKey(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    phone: varchar("phone", { length: 50 }).notNull().default(""),
    company: varchar("company", { length: 180 }).notNull(),
    message: text("message").notNull(),
    preferredDate: varchar("preferred_date", { length: 30 }).notNull().default(""),
    status: varchar("status", { length: 20 }).notNull().default("new"),
    submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    statusIdx: index("leads_status_idx").on(table.status),
    submittedAtIdx: index("leads_submitted_at_idx").on(table.submittedAt),
  }),
);

export type LeadRow = typeof leads.$inferSelect;
export type NewLeadRow = typeof leads.$inferInsert;
