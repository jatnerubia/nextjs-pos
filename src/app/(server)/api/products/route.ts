import db from "@/db"
import { insertProductsSchema, products } from "@/db/schemas/products.schema"
import { NextRequest } from "next/server"
import { ZodError } from "zod"

const PAGE_SIZE = 20

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const parsedPage = Number(searchParams.get("page") ?? 1)
    const page = isNaN(parsedPage) ? 1 : parsedPage

    const items = await db.query.products.findMany({
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
    })

    const totalCount = await db.$count(products)
    const totalPages = Math.ceil(totalCount / PAGE_SIZE)

    const previousPage = page > 1 ? page - 1 : null
    const nextPage = page < totalPages ? page + 1 : null

    return Response.json({
      items,
      metadata: {
        current_page: page,
        previous_page: previousPage,
        next_page: nextPage,
        total_count: totalCount,
        total_pages: totalPages,
      },
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
