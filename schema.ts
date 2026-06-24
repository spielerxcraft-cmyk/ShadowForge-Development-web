import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const siteSettings = pgTable("site_settings", {
  id: serial().primaryKey(),
  key: text().notNull().unique(),
  value: text().notNull().default(""),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const pricingTiers = pgTable("pricing_tiers", {
  id: serial().primaryKey(),
  name: text().notNull(),
  price: text().notNull(),
  description: text().notNull(),
  features: text().notNull().default("[]"),
  highlighted: boolean().notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const featureCards = pgTable("feature_cards", {
  id: serial().primaryKey(),
  icon: text().notNull().default("sword"),
  title: text().notNull(),
  description: text().notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const announcements = pgTable("announcements", {
  id: serial().primaryKey(),
  title: text().notNull(),
  content: text().notNull(),
  type: text().notNull().default("info"),
  active: boolean().notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const serverInfoItems = pgTable("server_info_items", {
  id: serial().primaryKey(),
  label: text().notNull(),
  value: text().notNull(),
  icon: text().notNull().default("server"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});
