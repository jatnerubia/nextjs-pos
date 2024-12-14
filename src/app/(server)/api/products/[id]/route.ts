import db from "@/db"
import { products } from "@/db/schemas"
import { verifySession } from "@/lib/dal"
import { eq } from "drizzle-orm"
import { ZodError } from "zod"

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await verifySession()

    if (!session) {
      return new Response(null, { status: 401 })
    }

    const id = (await params).id
    const result = await db.delete(products).where(eq(products.id, id))
    if (result.rowCount === 0) {
      return Response.json(
        {
          message: "Not found",
        },
        {
          status: 404,
        }
      )
    }
    return Response.json({
      message: "Product successfully deleted",
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(error, {
        status: 400,
      })
    }
    return Response.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    )
  }
}
