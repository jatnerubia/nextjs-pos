import { DELETE } from "@/app/(server)/api/products/[id]/route"
import { POST } from "@/app/(server)/api/products/route"
import { verifySession } from "@/lib/dal"
import { beforeEach, describe, expect, it, Mock, vi } from "vitest"

vi.mock("@/lib/dal", () => ({
  verifySession: vi.fn(),
}))

describe("Products API", () => {
  beforeEach(() => {
    const mockedVerifySession = verifySession as Mock
    mockedVerifySession.mockResolvedValue({ isAuth: true, userId: "1" })
  })

  describe("Delete", () => {
    it("should return 200 and a success message", async () => {
      const requestObject = {
        json: async () => ({ name: "Product 1", price: 100 }),
      } as never
      const createResponse = await POST(requestObject)
      const body = await createResponse.json()
      const response = await DELETE({} as never, { params: { id: body.id } } as never)
      expect(response.status).toBe(200)
    })

    it("should return 404 for a non-existent product ID", async () => {
      const response = await DELETE(
        {} as never,
        { params: { id: "00000000-0000-0000-0000-000000000000" } } as never
      )
      expect(response.status).toBe(404)
    })
  })
})
