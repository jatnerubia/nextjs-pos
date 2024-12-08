"use client"

import { ModeToggle } from "@/components/shared/mode-toggle"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { DashboardIcon, GitHubLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: DashboardIcon,
  },
  {
    title: "POS",
    url: "/pos",
    icon: DashboardIcon,
  },
  {
    title: "Products",
    url: "/products",
    icon: DashboardIcon,
  },
]

export function AppSidebar() {
  const { open } = useSidebar()

  return (
    <Sidebar variant='floating' collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className='p-1'>
          <div className={`flex ${open ? "flex-row" : "flex-col"} items-center gap-1`}>
            <Button asChild variant='ghost' size='icon' aria-label='github link'>
              <Link href='#'>
                <GitHubLogoIcon className='w-5 h-5' />
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
