import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users are managed by Clerk, we just reference their ID

export const snapshots = pgTable("snapshots", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  title: text("title").notNull(),
  note: text("note"),
  browserTabs: jsonb("browser_tabs").$type<{
    title: string;
    url: string;
    favIconUrl?: string;
  }[]>(),
  vscodeFiles: jsonb("vscode_files").$type<{
    path: string;
    name: string;
    language?: string;
  }[]>(),
  focusSessionId: uuid("focus_session_id"),
  tags: jsonb("tags").$type<string[]>().default([]),
});

export const focusSessions = pgTable("focus_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  endedAt: timestamp("ended_at"),
  durationMinutes: integer("duration_minutes"),
  interrupted: boolean("interrupted").default(false).notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
});

export const interrupts = pgTable("interrupts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  focusSessionId: uuid("focus_session_id"),
  occurredAt: timestamp("occurred_at").defaultNow().notNull(),
  appName: text("app_name").notNull(),
  durationSeconds: integer("duration_seconds"),
});

// Relations
export const snapshotsRelations = relations(snapshots, ({ one }) => ({
  focusSession: one(focusSessions, {
    fields: [snapshots.focusSessionId],
    references: [focusSessions.id],
  }),
}));

export const focusSessionsRelations = relations(focusSessions, ({ many }) => ({
  snapshots: many(snapshots),
  interrupts: many(interrupts),
}));

export const interruptsRelations = relations(interrupts, ({ one }) => ({
  focusSession: one(focusSessions, {
    fields: [interrupts.focusSessionId],
    references: [focusSessions.id],
  }),
}));
