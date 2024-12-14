import { Product } from "@/db/schemas"

// TODO: change this to OrderItem
export interface Order {
  product: Product
  quantity: string
}
