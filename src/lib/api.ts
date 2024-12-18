import { LoginFormData } from "@/common/types/auth.type"
import { PaginatedResponse } from "@/common/types/pagination.type"
import { Product } from "@/db/schemas"

export const login = async (formData: LoginFormData) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(formData),
  })
  if (!response.ok) {
    throw new Error("Something went wrong")
  }
  const result = await response.json()
  return result
}

export const getProducts = async (): Promise<PaginatedResponse<Product>> => {
  const response = await fetch("/api/products")
  if (!response.ok) {
    throw new Error("Something went wrong")
  }
  const result = await response.json()
  return result
}

export const createProduct = async (product: Product) => {
  const response = await fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(product),
  })
  if (!response.ok) {
    throw new Error("Something went wrong")
  }
  const result = await response.json()
  return result
}

export const deleteProduct = async (id: string) => {
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Something went wrong")
  }
  const result = await response.json()
  return result
}
