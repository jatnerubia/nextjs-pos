import { Product } from "@/common/types/product.type"
import { openDB } from "idb"

const DB_NAME = "shop"
const PRODUCT_STORE_NAME = "products"

const db = await openDB(DB_NAME, 1, {
  upgrade: (db) => {
    if (!db.objectStoreNames.contains(PRODUCT_STORE_NAME)) {
      db.createObjectStore(PRODUCT_STORE_NAME, { keyPath: "id" })
    }
  },
})

export const getProducts = async () => {
  const products = await db.getAll(PRODUCT_STORE_NAME)
  return products as Product[]
}

export const addProduct = async (product: Product) => {
  await db.add(PRODUCT_STORE_NAME, product)
}

export const deleteProduct = async (id: number) => {
  await db.delete(PRODUCT_STORE_NAME, id)
}
