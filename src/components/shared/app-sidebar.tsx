"use client"

import { Cart } from "@/components/shared/cart"
import { Button } from "@/components/ui/button"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup } from "@/components/ui/sidebar"
import { useOrderStore } from "@/stores/use-order.store"

export function AppSidebar() {
  const orders = useOrderStore((state) => state.orders)
  const clearOrder = useOrderStore((state) => state.clearOrder)
  const total = orders.reduce((prev, order) => prev + order.product.price * order.quantity, 0)

  return (
    <Sidebar variant='floating' collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <Cart />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className='flex justify-between items-center'>
          <span>TOTAL</span>
          <span>{total}</span>
        </div>
        <Button variant='destructive' onClick={clearOrder}>
          Clear
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
