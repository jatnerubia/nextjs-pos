import { z } from "zod"

const base64Regex = /^[A-Za-z0-9+/=]{44}$/

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  DATABASE_LOGGER: z
    .string()
    .transform((value) => value === "true")
    .default("false"),
  SESSION_SECRET: z.string().regex(base64Regex, {
    message: "Invalid base64 string (length must be 44 characters)",
  }),
})
