import { loginSchema } from "@/common/schemas/auth.schema"
import db from "@/db"
import { users } from "@/db/schemas"
import { createSession } from "@/lib/session"
import { eq } from "drizzle-orm"
import { ZodError } from "zod"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const parsedData = loginSchema.parse({
      email,
      password,
    })

    const user = await db.query.users.findFirst({ where: eq(users.email, parsedData.email) })

    if (user === undefined) {
      return Response.json(
        { message: "Invalid credentials" },
        {
          status: 400,
        }
      )
    }

    await createSession(user.id)

    return Response.json(
      { message: "Login success" },
      {
        status: 200,
      }
    )
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
