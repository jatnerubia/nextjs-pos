import type { Metadata } from "next"

import "./globals.css"

import { AppSidebar } from "@/components/shared/app-sidebar"
import { Navbar } from "@/components/shared/navbar"
import { ReactQueryClientProvider } from "@/components/shared/react-query-client-provider"
import { ThemeProvider } from "@/components/shared/theme-provider"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import localFont from "next/font/local"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  description: "Simple POS app",
  title: "NextJS POS",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryClientProvider>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <main className='px-2'>
                  <Navbar />
                  {children}
                </main>
              </SidebarInset>
            </SidebarProvider>
          </ReactQueryClientProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
