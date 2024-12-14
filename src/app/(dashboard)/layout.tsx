import type { Metadata } from "next"

import { AppSidebar } from "@/components/shared/app-sidebar"
import { Navbar } from "@/components/shared/navbar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export const metadata: Metadata = {
  description: "Simple POS app",
  title: "Dashboard | NextJS POS",
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className='px-2'>
          <Navbar />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
