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
import { useOrderStore } from "@/stores/use-order.store"
import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons"

export function Cart() {
  const orders = useOrderStore((state) => state.orders)
  const updateOrder = useOrderStore((state) => state.updateOrder)
  const increaseOrder = useOrderStore((state) => state.increaseOrder)
  const decreaseOrder = useOrderStore((state) => state.decreaseOrder)
  const clearOrder = useOrderStore((state) => state.clearOrder)

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>Cart</h2>
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
      </div>
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
  )
}
