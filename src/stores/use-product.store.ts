import { Product } from "@/common/types/product.type"
import { create } from "zustand"

interface ProductStore {
  products: Product[]
}

export const useProductStore = create<ProductStore>()(() => ({
  products: [
    {
      name: "BBQ",
      price: 25,
    },
    {
      name: "Tenga",
      price: 18,
    },
    {
      name: "Bulaklak",
      price: 12,
    },
    {
      name: "Butchi",
      price: 12,
    },
    {
      name: "Hotdog",
      price: 13,
    },
    {
      name: "Isaw",
      price: 6,
    },
    {
      name: "Dugo",
      price: 6,
    },
  ],
}))
