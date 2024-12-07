import { ModeToggle } from "@/components/shared/mode-toggle"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export const Navbar = () => {
  return (
    <header>
      <nav className='h-16 flex justify-between items-center'>
        <SidebarTrigger />
        <div className='flex items-center gap-1'>
          <Button asChild variant='ghost' size='icon' aria-label='github link'>
            <Link href='https://github.com/jatnerubia/nextjs-starter'>
              <GitHubLogoIcon className='w-5 h-5' />
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
