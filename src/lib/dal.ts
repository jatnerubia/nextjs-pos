"use server"

import { decrypt } from "@/lib/session"
import { cookies } from "next/headers"

export const verifySession = async () => {
  const cookie = (await cookies()).get("session")?.value

  if (!cookie) return null

  const session = await decrypt(cookie)

  if (!session?.userId) return null

  return { isAuth: true, userId: session.userId }
}
