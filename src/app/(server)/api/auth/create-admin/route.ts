import env from "@/common/env"
import db from "@/db"
import { users } from "@/db/schemas"
import bcrypt from "bcrypt"
import { eq } from "drizzle-orm"
import { ZodError } from "zod"

export async function GET() {
  try {
    const name = env.ADMIN_NAME
    const email = env.ADMIN_EMAIL
    const password = env.ADMIN_PASSWORD

    const existingAdmin = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (existingAdmin) {
      return Response.json(
        { message: "An admin account already exists." },
        {
          status: 200,
        }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    })

    return Response.json(
      { message: "Admin account created successfully!" },
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
