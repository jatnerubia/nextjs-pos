import type { Metadata } from "next"

export const metadata: Metadata = {
  description: "Simple POS app",
  title: "Login | NextJS POS",
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
