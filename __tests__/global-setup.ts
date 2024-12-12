import "@/common/env"
import { execSync } from "child_process"

export default function globalSetup() {
  execSync("npm run db:push", { stdio: "inherit" })
}
