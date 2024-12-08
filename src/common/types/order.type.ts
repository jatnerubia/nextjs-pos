import { Product } from "@/common/types/product.type"

export interface Order {
  product: Product
  quantity: string
}
