import { Product } from "@/common/types/product.type"
import { create } from "zustand"

interface ProductStore {
  products: Product[]
}

export const useProductStore = create<ProductStore>()(() => ({
  products: [
    {
      id: 1,
      name: "BBQ",
      price: 25,
    },
    {
      id: 2,
      name: "Tenga",
      price: 18,
    },
    {
      id: 3,
      name: "Bulaklak",
      price: 12,
    },
    {
      id: 4,
      name: "Butchi",
      price: 12,
    },
    {
      id: 5,
      name: "Hotdog",
      price: 13,
    },
    {
      id: 6,
      name: "Isaw",
      price: 6,
    },
    {
      id: 7,
      name: "Dugo",
      price: 6,
    },
  ],
}))
