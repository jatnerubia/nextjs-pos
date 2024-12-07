"use client"

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useProductStore } from "@/stores/use-product.store"

export default function Home() {
  const products = useProductStore((state) => state.products)

  return (
    <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {products.map((product, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardFooter>P {product.price}</CardFooter>
        </Card>
      ))}
    </main>
  )
}
