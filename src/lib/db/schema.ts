import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  title: varchar("title", { length: 160 }).notNull(),
  client: varchar("client", { length: 160 }),
  category: varchar("category", { length: 80 }).notNull().default("Web App"),
  summary: text("summary").notNull(),
  description: text("description").notNull().default(""),
  techStack: text("tech_stack").array().notNull().default([]),
  imageUrl: text("image_url").notNull(),
  liveUrl: text("live_url"),
  repoUrl: text("repo_url"),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  year: varchar("year", { length: 8 }),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  company: varchar("company", { length: 160 }),
  budget: varchar("budget", { length: 80 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
