"use client"

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { addProduct, deleteProduct, getProducts } from "@/db"
import { TrashIcon } from "@radix-ui/react-icons"
import { useState } from "react"

const products = await getProducts()

export default function Products() {
  const [name, setName] = useState<string>("")
  const [price, setPrice] = useState<string>("")

  const handleAdd = () => {
    addProduct({
      id: Date.now(),
      name,
      price: Number(price),
    })
  }

  return (
    <div>
      <div className='flex justify-end'>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Add</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add Product</AlertDialogTitle>
            </AlertDialogHeader>
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='price'>Price</Label>
              <Input id='price' value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAdd}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
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
                      <AlertDialogAction onClick={async () => deleteProduct(product.id)}>
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
    </div>
  )
}
