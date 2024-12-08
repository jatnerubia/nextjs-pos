"use client"

import { Product } from "@/common/types/product.type"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useOrderStore } from "@/stores/use-order.store"
import { useProductStore } from "@/stores/use-product.store"

export default function Home() {
  const addOrder = useOrderStore((state) => state.addOrder)
  const products = useProductStore((state) => state.products)

  const handleAdd = (product: Product) => {
    addOrder({
      product,
      quantity: "1",
    })
  }

  return (
    <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {products.map((product, i) => (
        <Card key={i} onClick={() => handleAdd(product)}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardFooter>P {product.price}</CardFooter>
        </Card>
      ))}
    </main>
  )
}
