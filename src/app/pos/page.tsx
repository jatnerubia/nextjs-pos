"use client"

import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from "@/db/schemas"
import { getProducts } from "@/lib/api"
import { useOrderStore } from "@/stores/use-order.store"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export default function Pos() {
  const addOrder = useOrderStore((state) => state.addOrder)

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState<string>("")

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  })

  const handleAdd = () => {
    if (selectedProduct) {
      addOrder({
        product: selectedProduct,
        quantity: quantity,
      })
    }
    setSelectedProduct(null)
    setQuantity("")
  }

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedProduct(null)
      setQuantity("")
    }
  }

  return (
    <main className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {data?.items.map((product, i) => (
        <Card
          key={i}
          className='cursor-pointer select-none active:bg-accent'
          onClick={() => setSelectedProduct(product)}
        >
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardFooter>P {product.price}</CardFooter>
        </Card>
      ))}
      <Dialog open={selectedProduct !== null} onOpenChange={handleOnOpenChange}>
        <DialogContent className='sm:max-w-[425px]' onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Enter Quantity for {selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='quantity'>Quantity</Label>
            <Input
              id='quantity'
              type='number'
              placeholder='0'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-5 gap-4'>
            {Array.from({ length: 20 }).map((_, i) => (
              <Button key={i} onClick={() => setQuantity((i + 1).toString())}>
                {i + 1}
              </Button>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={handleAdd}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
