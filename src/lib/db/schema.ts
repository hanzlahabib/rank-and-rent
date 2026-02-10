import {
  pgTable,
  text,
  timestamp,
  varchar,
  jsonb,
  integer,
  uuid,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const siteStatusEnum = pgEnum("site_status", [
  "active",
  "paused",
  "draft",
]);
export const leadStatusEnum = pgEnum("lead_status", [
  "new",
  "contacted",
  "qualified",
  "converted",
  "lost",
]);
export const leadSourceEnum = pgEnum("lead_source", [
  "form",
  "call",
  "chat",
  "sms",
]);
export const tenantStatusEnum = pgEnum("tenant_status", [
  "active",
  "paused",
  "cancelled",
]);
export const callStatusEnum = pgEnum("call_status", [
  "initiated",
  "ringing",
  "in-progress",
  "completed",
  "no-answer",
  "busy",
  "failed",
]);

export const sites = pgTable("sites", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  domain: varchar("domain", { length: 255 }),
  nicheSlug: varchar("niche_slug", { length: 100 }).notNull(),
  businessName: varchar("business_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 50 }).notNull(),
  suburb: varchar("suburb", { length: 100 }).notNull(),
  zipCode: varchar("zip_code", { length: 10 }).notNull(),
  status: siteStatusEnum("status").default("draft").notNull(),
  seoConfig: jsonb("seo_config").$type<{
    titleTemplate: string;
    descriptionTemplate: string;
    ogImage: string | null;
    canonicalBase: string;
  }>(),
  contentOverrides: jsonb("content_overrides").$type<
    Record<string, string>
  >(),
  tenantId: uuid("tenant_id").references(() => tenants.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  siteSlug: varchar("site_slug", { length: 255 }).notNull(),
  tenantId: uuid("tenant_id").references(() => tenants.id),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  message: text("message"),
  service: varchar("service", { length: 255 }),
  source: leadSourceEnum("source").default("form").notNull(),
  status: leadStatusEnum("status").default("new").notNull(),
  notifiedAt: timestamp("notified_at"),
  twilioCallSid: varchar("twilio_call_sid", { length: 64 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tenants = pgTable("tenants", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  monthlyRate: integer("monthly_rate").default(0).notNull(),
  status: tenantStatusEnum("status").default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const callLogs = pgTable("call_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  siteSlug: varchar("site_slug", { length: 255 }).notNull(),
  leadId: uuid("lead_id").references(() => leads.id),
  twilioCallSid: varchar("twilio_call_sid", { length: 64 }).unique(),
  direction: varchar("direction", { length: 20 }).notNull(), // inbound | outbound
  from: varchar("from_number", { length: 20 }).notNull(),
  to: varchar("to_number", { length: 20 }).notNull(),
  status: callStatusEnum("status").default("initiated").notNull(),
  duration: integer("duration").default(0),
  recordingUrl: text("recording_url"),
  transcription: text("transcription"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const notificationLogs = pgTable("notification_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  leadId: uuid("lead_id").references(() => leads.id),
  type: varchar("type", { length: 20 }).notNull(), // sms | email
  to: varchar("to_address", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 20 }).default("sent").notNull(),
  twilioSid: varchar("twilio_sid", { length: 64 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contractors = pgTable("contractors", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  businessName: varchar("business_name", { length: 255 }),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }),
  siteSlug: varchar("site_slug", { length: 255 }).notNull(),
  status: varchar("status", { length: 20 }).default("prospect").notNull(), // prospect | contacted | interested | signed | rejected
  lastContactedAt: timestamp("last_contacted_at"),
  notes: text("notes"),
  monthlyRate: integer("monthly_rate").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const sitesRelations = relations(sites, ({ one, many }) => ({
  tenant: one(tenants, {
    fields: [sites.tenantId],
    references: [tenants.id],
  }),
  leads: many(leads),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  tenant: one(tenants, {
    fields: [leads.tenantId],
    references: [tenants.id],
  }),
}));

export const tenantsRelations = relations(tenants, ({ many }) => ({
  sites: many(sites),
  leads: many(leads),
}));
