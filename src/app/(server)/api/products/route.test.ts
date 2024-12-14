import { GET, POST } from "@/app/(server)/api/products/route"
import { describe, expect, it } from "vitest"

describe("Products API", () => {
  describe("List", () => {
    it("should return 200 and a list of products", async () => {
      const requestObject = {
        nextUrl: {
          searchParams: new URLSearchParams({ page: "1" }),
        },
      } as never
      const response = await GET(requestObject)
      const body = await response.json()
      expect(response.status).toBe(200)
      expect(body).toHaveProperty("items")
      expect(body).toHaveProperty("metadata")
    })
  })

  describe("Create", () => {
    it("should return 201 for successful creation of product", async () => {
      const requestObject = {
        json: async () => ({ name: "Product 1", price: 100 }),
      } as never
      const response = await POST(requestObject)
      expect(response.status).toBe(201)
    })

    it("should return 400 for missing name field", async () => {
      const requestObject = {
        json: async () => ({ price: 100 }),
      } as never
      const response = await POST(requestObject)
      expect(response.status).toBe(400)
    })

    it("should return 400 for missing price field", async () => {
      const requestObject = {
        json: async () => ({ name: "Product 1" }),
      } as never
      const response = await POST(requestObject)
      expect(response.status).toBe(400)
    })

    it("should return 400 for invalid price field", async () => {
      const requestObject = {
        json: async () => ({ name: "Product 1", price: "invalid price" }),
      } as never
      const response = await POST(requestObject)
      expect(response.status).toBe(400)
    })

    it("should return 400 for price lower than the minimum allowed", async () => {
      const requestObject = {
        json: async () => ({ name: "Product 1", price: -1 }),
      } as never
      const response = await POST(requestObject)
      expect(response.status).toBe(400)
    })

    it("should return 400 for price exceeding the maximum allowed", async () => {
      const requestObject = {
        json: async () => ({ name: "Product 1", price: 10_000_000 }),
      } as never
      const response = await POST(requestObject)
      expect(response.status).toBe(400)
    })
  })
})
