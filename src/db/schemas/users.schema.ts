import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().unique().notNull(),
  password: text(),
  emailVerifiedAt: timestamp(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp(),
})

export const selectUsersSchema = createSelectSchema(users).omit({
  password: true,
})

export const insertUsersSchema = createInsertSchema(users, {
  name: (s) => s.min(1).max(255),
  email: (s) => s.email().max(255),
  password: (s) => s.min(8).max(255),
}).omit({
  id: true,
  emailVerifiedAt: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
})

export const patchUsersSchema = insertUsersSchema.partial()
