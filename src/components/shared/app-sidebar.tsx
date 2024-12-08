"use client"

import { Cart } from "@/components/shared/cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup } from "@/components/ui/sidebar"
import { useOrderStore } from "@/stores/use-order.store"
import { useState } from "react"

export function AppSidebar() {
  const orders = useOrderStore((state) => state.orders)
  const clearOrder = useOrderStore((state) => state.clearOrder)
  const total = orders.reduce((prev, order) => prev + order.product.price * order.quantity, 0)

  const [amountPaid, setAmountPaid] = useState<string>("")
  const convertedAmountPaid = Number(amountPaid)
  const amountPaidInNumber = isNaN(convertedAmountPaid) ? 0 : convertedAmountPaid
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
        <Button variant='destructive' onClick={clearOrder}>
          Clear
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
