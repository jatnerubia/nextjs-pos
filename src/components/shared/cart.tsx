"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useOrderStore } from "@/stores/use-order.store"
import { BackpackIcon, MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons"
import { useState } from "react"

export function Cart() {
  const orders = useOrderStore((state) => state.orders)
  const updateOrder = useOrderStore((state) => state.updateOrder)
  const increaseOrder = useOrderStore((state) => state.increaseOrder)
  const decreaseOrder = useOrderStore((state) => state.decreaseOrder)
  const clearOrder = useOrderStore((state) => state.clearOrder)

  const total = orders.reduce(
    (prev, order) => prev + order.product.price * Number(order.quantity),
    0
  )

  const [amountPaid, setAmountPaid] = useState<string>("")
  const amountPaidInNumber = Number(amountPaid)
  const change = amountPaidInNumber - total

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon'>
          <BackpackIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col'>
        <SheetHeader>
          <SheetTitle className='flex justify-between items-center'>
            <span>Cart</span>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive' size='icon'>
                  <TrashIcon />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear cart?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={clearOrder}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetTitle>
        </SheetHeader>
        <div className='flex-1 flex flex-col gap-2 overflow-y-scroll'>
          {orders.map((order, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className='flex justify-between items-center'>
                  <span>{order.product.name}</span>
                  <span>P {order.product.price * Number(order.quantity)}</span>
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <div className='flex'>
                  <Button
                    className='border-r-0 rounded-r-none px-1'
                    variant='outline'
                    size='icon'
                    onClick={() => decreaseOrder(order)}
                  >
                    <MinusIcon />
                  </Button>
                  <Input
                    className='w-full text-center rounded-l-none rounded-r-none focus-visible:ring-0'
                    type='number'
                    value={order.quantity}
                    onChange={(e) => {
                      updateOrder({
                        ...order,
                        quantity: e.target.value,
                      })
                    }}
                  />
                  <Button
                    className='border-l-0 rounded-l-none px-1'
                    variant='outline'
                    size='icon'
                    onClick={() => increaseOrder(order)}
                  >
                    <PlusIcon />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <SheetFooter>
          <div className='w-full flex flex-col'>
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
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
