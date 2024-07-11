import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { FlightClass } from "./custom/searchbox"
  
const classess: FlightClass[]  = [
    "Economy",
    "Business",
    "First Class",
    "Premium Economy" 
]

  export function ClassSelector({children, setClass}: {children: React.ReactNode, setClass: React.Dispatch<React.SetStateAction<FlightClass>>}) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
         
          <DropdownMenuGroup>
            {
                classess.map((c, i) => <DropdownMenuItem onClick={() => setClass(c)} key={i}>{c}</DropdownMenuItem>)
            }
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  