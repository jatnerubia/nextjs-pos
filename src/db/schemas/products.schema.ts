import { numeric, pgTable, text, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const products = pgTable("products", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  price: numeric({ precision: 9, scale: 2 }),
})

export const selectProductsSchema = createSelectSchema(products)

export const insertProductsSchema = createInsertSchema(products, {
  name: (s) => s.min(1).max(255),
}).omit({
  id: true,
})

export const patchUsersSchema = insertProductsSchema.partial()
