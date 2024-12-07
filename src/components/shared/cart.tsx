import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useOrderStore } from "@/stores/use-order.store"

export function Cart() {
  const orders = useOrderStore((state) => state.orders)

  return (
    <div>
      {orders.map((order, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>
              {order.product.name} x{order.quantity}
            </CardTitle>
          </CardHeader>
          <CardFooter>P {order.product.price * order.quantity}</CardFooter>
        </Card>
      ))}
    </div>
  )
}
