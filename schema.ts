import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const hadiths = pgTable(
  "hadiths",
  {
    id: serial("id").primaryKey(),
    bukhariId: integer("bukhari_id").notNull(),
    number: integer("number").notNull(),
    chapter: varchar("chapter", { length: 300 }).notNull().default(""),
    text: text("text").notNull(),
    textNorm: text("text_norm").notNull().default(""),
    chapterNorm: varchar("chapter_norm", { length: 300 }).notNull().default(""),
  },
  (t) => [
    index("hadiths_number_idx").on(t.number),
    index("hadiths_chapter_idx").on(t.chapter),
  ]
);

export const bookmarks = pgTable(
  "bookmarks",
  {
    id: serial("id").primaryKey(),
    visitorId: varchar("visitor_id", { length: 64 }).notNull(),
    kind: varchar("kind", { length: 20 }).notNull(), // ayah | hadith | dhikr | name
    ref: varchar("ref", { length: 120 }).notNull(),
    label: varchar("label", { length: 300 }).notNull().default(""),
    body: text("body").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("bookmarks_visitor_idx").on(t.visitorId)]
);
