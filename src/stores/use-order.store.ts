import { Order } from "@/common/types/order.type"
import { create } from "zustand"

interface OrderStore {
  orders: Order[]
  addOrder: (order: Order) => void
  clearOrder: () => void
}

export const useOrderStore = create<OrderStore>()((set) => ({
  orders: [],
  addOrder: (order: Order) =>
    set((state) => {
      const orderIndex = state.orders.findIndex(
        (existingOrder) => existingOrder.product.id === order.product.id
      )

      if (orderIndex !== -1) {
        const updatedOrders = [...state.orders]
        updatedOrders[orderIndex].quantity += order.quantity
        return { orders: updatedOrders }
      }

      return {
        orders: [...state.orders, order],
      }
    }),
  clearOrder: () =>
    set(() => ({
      orders: [],
    })),
}))
