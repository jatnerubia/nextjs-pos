import { AddProductDialog } from "@/app/(web)/(dashboard)/products/components/add-product-dialog"
import { ProductsTable } from "@/app/(web)/(dashboard)/products/components/products-table"

export default function Products() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-bold'>Products</h1>
        <AddProductDialog />
      </div>
      <ProductsTable />
    </div>
  )
}
