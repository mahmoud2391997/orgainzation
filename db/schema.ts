import { index, integer, jsonb, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

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

export const cmsServices = pgTable(
  "cms_services",
  {
    id: text("id").primaryKey(),
    name: varchar("name", { length: 180 }).notNull(),
    slug: varchar("slug", { length: 180 }).notNull().unique(),
    description: text("description").notNull(),
    detailedDescription: text("detailed_description").notNull().default(""),
    icon: varchar("icon", { length: 40 }).notNull().default("spark"),
    technologies: jsonb("technologies").$type<string[]>().notNull().default([]),
    image: text("image").notNull().default(""),
    offerings: jsonb("offerings").$type<string[]>().notNull().default([]),
    caseStudy: text("case_study").notNull().default(""),
    caseMetric: text("case_metric").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    sortIdx: index("cms_services_sort_idx").on(table.sortOrder),
  }),
);

export const cmsTechnologies = pgTable(
  "cms_technologies",
  {
    id: text("id").primaryKey(),
    name: varchar("name", { length: 180 }).notNull(),
    description: text("description").notNull(),
    category: varchar("category", { length: 120 }).notNull().default(""),
    icon: varchar("icon", { length: 40 }).notNull().default("spark"),
    image: text("image").notNull().default(""),
    caseStudy: text("case_study").notNull().default(""),
    caseMetric: text("case_metric").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    sortIdx: index("cms_technologies_sort_idx").on(table.sortOrder),
  }),
);

export const cmsSolutions = pgTable(
  "cms_solutions",
  {
    id: text("id").primaryKey(),
    title: varchar("title", { length: 180 }).notNull(),
    description: text("description").notNull(),
    industry: varchar("industry", { length: 120 }).notNull().default(""),
    image: text("image").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    sortIdx: index("cms_solutions_sort_idx").on(table.sortOrder),
  }),
);

export const cmsExamples = pgTable(
  "cms_examples",
  {
    id: text("id").primaryKey(),
    title: varchar("title", { length: 220 }).notNull(),
    eyebrow: varchar("eyebrow", { length: 120 }).notNull().default(""),
    category: varchar("category", { length: 40 }).notNull(),
    description: text("description").notNull(),
    capabilities: jsonb("capabilities").$type<string[]>().notNull().default([]),
    stack: jsonb("stack").$type<string[]>().notNull().default([]),
    timeline: varchar("timeline", { length: 80 }).notNull().default(""),
    media: text("media").notNull().default(""),
    metric: text("metric").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    sortIdx: index("cms_examples_sort_idx").on(table.sortOrder),
    categoryIdx: index("cms_examples_category_idx").on(table.category),
  }),
);

export const mediaAssets = pgTable(
  "media_assets",
  {
    id: text("id").primaryKey(),
    path: text("path").notNull().unique(),
    originalName: varchar("original_name", { length: 255 }).notNull(),
    mimeType: varchar("mime_type", { length: 100 }).notNull(),
    sizeBytes: integer("size_bytes").notNull().default(0),
    alt: text("alt").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    createdIdx: index("media_assets_created_idx").on(table.createdAt),
  }),
);

export type LeadRow = typeof leads.$inferSelect;
export type NewLeadRow = typeof leads.$inferInsert;
export type CmsServiceRow = typeof cmsServices.$inferSelect;
export type CmsTechnologyRow = typeof cmsTechnologies.$inferSelect;
export type CmsSolutionRow = typeof cmsSolutions.$inferSelect;
export type CmsExampleRow = typeof cmsExamples.$inferSelect;
export type MediaAssetRow = typeof mediaAssets.$inferSelect;
