import { Order } from "@/common/types/order.type"
import { create } from "zustand"

interface OrderStore {
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrder: (order: Order) => void
  increaseOrder: (order: Order) => void
  decreaseOrder: (order: Order) => void
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
        const currentOrder = updatedOrders[orderIndex]
        const newQuantity = Number(currentOrder.quantity) + Number(order.quantity)
        currentOrder.quantity = newQuantity.toString()
        return { orders: updatedOrders }
      }

      return {
        orders: [...state.orders, order],
      }
    }),
  updateOrder: (order: Order) =>
    set((state) => {
      const orderIndex = state.orders.findIndex(
        (existingOrder) => existingOrder.product.id === order.product.id
      )

      if (orderIndex !== -1) {
        const updatedOrders = [...state.orders]
        updatedOrders[orderIndex] = order
        return { orders: updatedOrders }
      }

      return {
        orders: [...state.orders, order],
      }
    }),
  increaseOrder: (order: Order) =>
    set((state) => {
      const orderIndex = state.orders.findIndex(
        (existingOrder) => existingOrder.product.id === order.product.id
      )

      if (orderIndex !== -1) {
        const updatedOrders = [...state.orders]
        const currentOrder = updatedOrders[orderIndex]
        const newQuantity = Number(currentOrder.quantity) + 1
        currentOrder.quantity = newQuantity.toString()
        return { orders: updatedOrders }
      }

      return state
    }),
  decreaseOrder: (order: Order) =>
    set((state) => {
      const orderIndex = state.orders.findIndex(
        (existingOrder) => existingOrder.product.id === order.product.id
      )

      if (orderIndex !== -1) {
        const updatedOrders = [...state.orders]
        const currentOrder = updatedOrders[orderIndex]
        const newQuantity = Number(currentOrder.quantity) - 1
        currentOrder.quantity = newQuantity.toString()
        if (newQuantity === 0) {
          updatedOrders.splice(orderIndex, 1)
        }
        return { orders: updatedOrders }
      }

      return state
    }),
  clearOrder: () =>
    set(() => ({
      orders: [],
    })),
}))
