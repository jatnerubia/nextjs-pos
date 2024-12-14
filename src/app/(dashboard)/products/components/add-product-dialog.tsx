"use client"

import { PRODUCTS } from "@/common/constants/app.constant"
import { PaginatedResponse } from "@/common/types/pagination.type"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from "@/db/schemas"
import { toast } from "@/hooks/use-toast"
import { createProduct } from "@/lib/api"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { useState } from "react"
import { LuLoader } from "react-icons/lu"
import { v4 as uuidv4 } from "uuid"
import { z } from "zod"

export const AddProductDialog = () => {
  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createProduct,
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey: [PRODUCTS] })
      const previousPaginatedProducts = queryClient.getQueryData([PRODUCTS])
      queryClient.setQueryData([PRODUCTS], (old: PaginatedResponse<Product>) => ({
        ...old,
        items: [...old.items, newProduct],
      }))
      return { previousPaginatedProducts }
    },
    onError: (error, variables, context) => {
      toast({
        title: "Unable to add product",
      })
      queryClient.setQueryData([PRODUCTS], context?.previousPaginatedProducts)
    },
    onSuccess: (error, variables) => {
      toast({
        title: `Added ${variables.name}`,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS] })
      setShowCreateDialog(false)
    },
  })

  const form = useForm({
    defaultValues: {
      name: "",
      price: "",
    },
    onSubmit: async ({ value }) => {
      form.reset()
      mutation.mutate({
        id: uuidv4(),
        name: value.name,
        price: value.price,
      })
    },
    validatorAdapter: zodValidator(),
  })

  return (
    <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
      <DialogTrigger asChild>
        <Button>Add</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form
          className='flex flex-col gap-4'
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>
          <form.Field
            name='name'
            validators={{
              onChange: z.string().min(1, { message: "Must be at least 1 character." }),
            }}
          >
            {(field) => (
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors ? (
                  <em role='alert' className='text-sm'>
                    {field.state.meta.errors.join(", ")}
                  </em>
                ) : null}
              </div>
            )}
          </form.Field>
          <form.Field
            name='price'
            validators={{
              onChange: z.string().min(1, { message: "Must be at least 1 character." }),
            }}
          >
            {(field) => (
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor='price'>Price</Label>
                <Input
                  id={field.name}
                  type='number'
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors ? (
                  <em role='alert' className='text-sm'>
                    {field.state.meta.errors.join(", ")}
                  </em>
                ) : null}
              </div>
            )}
          </form.Field>
          <DialogFooter>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isDirty, state.isSubmitting]}
            >
              {([canSubmit, isDirty, isSubmitting]) => (
                <Button
                  type='submit'
                  disabled={!canSubmit || !isDirty || mutation.isPending}
                  aria-label='submit button'
                >
                  {(isSubmitting || mutation.isPending) && <LuLoader />}
                  Create
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
