import { Order } from "@/common/types/order.type"
import { create } from "zustand"

interface OrderStore {
  orders: Order[]
  setOrders: (order: Order) => void
}

export const useOrderStore = create<OrderStore>()((set) => ({
  orders: [],
  setOrders: (order: Order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),
}))
