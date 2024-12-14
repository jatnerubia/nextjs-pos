import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Must be at least 8 character" }),
})
