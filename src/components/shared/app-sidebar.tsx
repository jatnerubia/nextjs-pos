"use client"

import { Cart } from "@/components/shared/cart"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup } from "@/components/ui/sidebar"
import { useOrderStore } from "@/stores/use-order.store"
import { useState } from "react"

export function AppSidebar() {
  const orders = useOrderStore((state) => state.orders)
  const total = orders.reduce(
    (prev, order) => prev + order.product.price * Number(order.quantity),
    0
  )

  const [amountPaid, setAmountPaid] = useState<string>("")
  const amountPaidInNumber = Number(amountPaid)
  const change = amountPaidInNumber - total

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
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='amount_paid'>Amount Paid</Label>
          <Input
            id='amount_paid'
            type='number'
            placeholder='0'
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
          />
        </div>
        <div className='flex justify-between items-center'>
          <span>CHANGE</span>
          <span>{change}</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
