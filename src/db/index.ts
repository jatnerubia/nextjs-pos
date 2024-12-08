import { Product } from "@/common/types/product.type"
import { IDBPDatabase, openDB } from "idb"

const DB_NAME = "shop"
const VERSION = 1
const PRODUCT_STORE_NAME = "products"

let db: IDBPDatabase | null = null

const initializeDB = async () => {
  if (typeof window !== "undefined") {
    db = await openDB(DB_NAME, VERSION, {
      upgrade: (db) => {
        if (!db.objectStoreNames.contains(PRODUCT_STORE_NAME)) {
          db.createObjectStore(PRODUCT_STORE_NAME, { keyPath: "id" })
        }
      },
    })
  }
}

initializeDB()

export const getProducts = async (): Promise<Product[]> => {
  if (db === null) return []
  const products = await db.getAll(PRODUCT_STORE_NAME)
  return products
}

export const addProduct = async (product: Product) => {
  if (db === null) return
  await db.add(PRODUCT_STORE_NAME, product)
}

export const deleteProduct = async (id: number) => {
  if (db === null) return
  await db.delete(PRODUCT_STORE_NAME, id)
}
