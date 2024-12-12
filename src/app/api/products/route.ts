import db from "@/db"
import { insertProductsSchema, products } from "@/db/schemas/products.schema"
import { ZodError } from "zod"

export async function POST(req: Request) {
  try {
    const { name, price } = await req.json()

    const parsedData = insertProductsSchema.parse({
      name,
      price,
    })

    const [inserted] = await db
      .insert(products)
      .values({
        name: parsedData.name,
        price: parsedData.price.toFixed(2),
      })
      .returning()

    return Response.json(inserted, {
      status: 201,
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
