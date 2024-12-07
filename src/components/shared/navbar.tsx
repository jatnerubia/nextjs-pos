import { ModeToggle } from "@/components/shared/mode-toggle"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export const Navbar = () => {
  return (
    <header className='absolute w-full'>
      <nav className='container mx-auto h-14 flex justify-between items-center px-4'>
        <span className='font-bold'>Nextjs Starter</span>
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
