import { pgTable, uuid, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  id: uuid("id").primaryKey().defaultRandom(),
  originalUrl: varchar("original_url", { length: 2048 }).notNull(),
  shortUrl: varchar("short_url", { length: 32 }).notNull().unique(),
  accessCount: integer("access_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
