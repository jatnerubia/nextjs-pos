import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useOrderStore } from "@/stores/use-order.store"
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"

export function Cart() {
  const orders = useOrderStore((state) => state.orders)
  const updateOrder = useOrderStore((state) => state.updateOrder)
  const increaseOrder = useOrderStore((state) => state.increaseOrder)
  const decreaseOrder = useOrderStore((state) => state.decreaseOrder)

  return (
    <div className='flex flex-col gap-2'>
      {orders.map((order, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle className='flex justify-between items-center'>
              <span>{order.product.name}</span>
              <span>P {order.product.price * order.quantity}</span>
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
                value={order.quantity}
                onChange={(e) => {
                  let quantity = Number(e.target.value)

                  if (isNaN(quantity)) {
                    quantity = 0
                  }

                  updateOrder({
                    ...order,
                    quantity,
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
  )
}
