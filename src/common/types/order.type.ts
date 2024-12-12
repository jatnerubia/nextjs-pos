import { Product } from "@/db/schemas"

export interface Order {
  product: Product
  quantity: string
}
