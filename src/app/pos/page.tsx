"use client"

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Product } from "@/db/schemas"
import { getProducts } from "@/lib/api"
import { useOrderStore } from "@/stores/use-order.store"
import { useQuery } from "@tanstack/react-query"

export default function Pos() {
  const addOrder = useOrderStore((state) => state.addOrder)

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  })

  const handleAdd = (product: Product) => {
    addOrder({
      product,
      quantity: "1",
    })
  }

  return (
    <main className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {data?.items.map((product, i) => (
        <Card
          key={i}
          className='cursor-pointer select-none active:bg-accent'
          onClick={() => handleAdd(product)}
        >
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardFooter>P {product.price}</CardFooter>
        </Card>
      ))}
    </main>
  )
}
