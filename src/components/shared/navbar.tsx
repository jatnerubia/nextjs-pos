import { Cart } from "@/components/shared/cart"
import { SidebarTrigger } from "@/components/ui/sidebar"

export const Navbar = () => {
  return (
    <header>
      <nav className='h-16 flex justify-between items-center'>
        <SidebarTrigger />
        <Cart />
      </nav>
    </header>
  )
}
