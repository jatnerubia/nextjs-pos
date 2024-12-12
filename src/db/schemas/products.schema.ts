import { PRODUCTS } from "@/common/constants/app.constant"
import { InferSelectModel } from "drizzle-orm"
import { numeric, pgTable, text, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const products = pgTable(PRODUCTS, {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  price: numeric({ precision: 9, scale: 2 }).notNull(),
})

export const selectProductsSchema = createSelectSchema(products)

export const insertProductsSchema = createInsertSchema(products, {
  name: (s) => s.min(1).max(255),
  price: () => z.coerce.number().min(0).max(9_999_999.99),
}).omit({
  id: true,
})

export const patchProductsSchema = insertProductsSchema.partial()

export type Product = InferSelectModel<typeof products>
