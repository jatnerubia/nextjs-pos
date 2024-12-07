import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useOrderStore } from "@/stores/use-order.store"
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"

export function Cart() {
  const orders = useOrderStore((state) => state.orders)
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
                className='rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10'
                variant='outline'
                size='icon'
                onClick={() => increaseOrder(order)}
              >
                <ChevronUpIcon />
              </Button>
              <span className='flex items-center border border-input px-3 text-sm font-medium'>
                {order.quantity}
              </span>
              <Button
                className='rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10'
                variant='outline'
                size='icon'
                onClick={() => decreaseOrder(order)}
              >
                <ChevronDownIcon />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
