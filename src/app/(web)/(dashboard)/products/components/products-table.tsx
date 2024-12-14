"use client"

import { PRODUCTS } from "@/common/constants/app.constant"
import { PaginatedResponse } from "@/common/types/pagination.type"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Product } from "@/db/schemas"
import { toast } from "@/hooks/use-toast"
import { deleteProduct, getProducts } from "@/lib/api"
import { TrashIcon } from "@radix-ui/react-icons"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const ProductsTable = () => {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: [PRODUCTS],
    queryFn: getProducts,
  })

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: [PRODUCTS] })
      const previousPaginatedProducts = queryClient.getQueryData([PRODUCTS])
      queryClient.setQueryData([PRODUCTS], (old: PaginatedResponse<Product>) => ({
        ...old,
        items: old.items.filter((product) => product.id !== id),
      }))
      return { previousPaginatedProducts }
    },
    onError: (error, variables, context) => {
      toast({
        title: "Unable to delete product",
      })
      queryClient.setQueryData([PRODUCTS], context?.previousPaginatedProducts)
    },
    onSuccess: () => {
      toast({
        title: `Product deleted`,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS] })
    },
  })

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.items.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>P{product.price}</TableCell>
            <TableCell>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant='destructive'>
                    <TrashIcon />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Product</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={async () => mutation.mutate(product.id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
