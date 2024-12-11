/* eslint-disable n/no-process-env */

import { loadEnvConfig } from "@next/env"
import { z, ZodError } from "zod"

const projectDir = process.cwd()
loadEnvConfig(projectDir)

export const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  DATABASE_LOGGER: z
    .string()
    .transform((value) => value === "true")
    .default("false"),
})

type env = z.infer<typeof EnvSchema>

let env: env

try {
  env = EnvSchema.parse(process.env)
} catch (e) {
  const error = e as ZodError
  // eslint-disable-next-line no-console
  console.error("❌ Invalid env:", error.flatten().fieldErrors)
  process.exit(1)
}

export default env
