import { getCurrentRole } from "@/lib/auth"
import Image from "next/image"
import {
  ChevronLeft,
  PlusCircle,
  Upload
} from "lucide-react"

import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { FlightForm } from "../../../_components/flight-form"

const AdminPage = async () => {
    return(
        <div className="mx-auto max-w-[59rem] flex flex-col gap-4 h-full">
          <div className="flex justify-between gap-4 w-full">
        <div className="flex gap-4">

        <Button variant="outline" size="icon" className="h-7 w-7">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Airline Controller
        </h1>
        <Badge variant="outline" className="ml-auto sm:ml-0 !py-1 h-6 my-auto">
          In stock
        </Badge>
        </div>
      </div>
              <FlightForm />
        </div>
    )
}

export default AdminPage