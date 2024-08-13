"use client"
import Passport from "@/components/icons/passport"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  } from "@/components/ui/tooltip"
import { Globe2, Home, LineChart, Package, Package2, Plane, Settings, ShoppingCart, Ticket, Users2, Wallet2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"


const MobileSidebar = () => {

    const path = usePathname()
    
    return(
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Link
            href="#"
            className={`group flex h-9 w-9 shrink-0 items-center justify-center gap-2  bg-primary text-lg text-primary-foreground font-semibold rounded-full    md:h-8 md:w-8 md:text-base hover:scale-110 transition duration-1000`}
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/dashboard"
                className={`${path.startsWith("/admin/dashboard") ? "bg-accent text-accent-foreground" : "text-foreground"} flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 hover:scale-110 transition duration-1000`}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/visa"
                className={`flex h-9 w-9 items-center justify-center ${path.startsWith("/admin/visa") ? "bg-accent text-foreground" : "text-muted-foreground"} rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8 hover:scale-110 transition duration-1000`}>
                <Globe2 className="h-5 w-5" />
                <span className="sr-only">Visa</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Visa</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/tickets"
                className={`flex h-9 w-9 items-center justify-center ${path.startsWith("/admin/tickets") ? "bg-accent text-foreground" : "text-muted-foreground"} rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8 hover:scale-110 transition duration-1000`}
              >
                <Ticket className="h-5 w-5"/>
                <span className="sr-only">Tickets</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Tickets</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/users"
                className={`flex h-9 w-9 items-center justify-center ${path.startsWith("/admin/users") ? "bg-accent text-foreground" : "text-muted-foreground"} rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 hover:scale-110 transition duration-1000`}
              >
                <Users2 className="h-5 w-5" />
                <span className="sr-only">Users</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Users</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/flights"
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${path.startsWith("/admin/flights") ? "bg-accent text-foreground" : "text-muted-foreground"} text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 hover:scale-110 transition duration-1000`}
              >
                <Plane className="h-5 w-5" />
                <span className="sr-only">Flights</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Flights</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/wallet"
                className={`flex h-9 w-9 items-center justify-center ${path.startsWith("/admin/wallet") ? "bg-accent text-foreground" : "text-muted-foreground"} rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 hover:scale-110 transition duration-1000`}
              >
                <Wallet2 className="h-5 w-5" />
                <span className="sr-only">Wallet</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Wallet</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/payment-request"
                className={`flex h-9 w-9 items-center justify-center ${path.startsWith("/admin/payment-request") ? "bg-accent text-accent-foreground" : "text-muted-foreground"} rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Payment Request</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Payment Request</TooltipContent>
          </Tooltip>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    )
  }
  
  export default MobileSidebar