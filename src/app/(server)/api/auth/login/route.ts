import { loginSchema } from "@/common/schemas/auth.schema"
import db from "@/db"
import { users } from "@/db/schemas"
import { createSession } from "@/lib/session"
import bcrypt from "bcrypt"
import { eq } from "drizzle-orm"
import { ZodError } from "zod"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const parsedData = loginSchema.parse({
      email,
      password,
    })

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, parsedData.email),
    })

    if (!existingUser) {
      return Response.json(
        { message: "Invalid credentials" },
        {
          status: 400,
        }
      )
    }

    if (!existingUser.password) {
      return Response.json(
        { message: "Invalid credentials" },
        {
          status: 400,
        }
      )
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password)

    if (!isPasswordMatch) {
      return Response.json(
        { message: "Invalid credentials" },
        {
          status: 400,
        }
      )
    }

    await createSession(existingUser.id)

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
