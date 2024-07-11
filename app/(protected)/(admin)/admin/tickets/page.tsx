import Image from "next/image"
import Link from "next/link"
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PrismaClient } from "@prisma/client"

export default async function TicketsPage() {

const prisma = new PrismaClient();
  const tickets = await prisma.ticket.findMany()
  return (        
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Inactive</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-7 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Link href="/admin/tickets/create" className="h-7 gap-1 flex bg-primary text-primary-foreground items-center px-2 py-1 rounded-sm">
                  <PlusCircle className="h-3.5 w-3.5"/>
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Tickets
                  </span>
                </Link>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Airline Tickets</CardTitle>
                  <CardDescription>
                    Manage your Airline tickets and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                <Table className="text-xs">
      <TableHeader>
        <TableRow>
          <TableHead>Airline</TableHead>
          <TableHead>Flight No</TableHead>
          <TableHead>Seats Count</TableHead>
          <TableHead>Flight Departure</TableHead>
          <TableHead>Flight Arrival</TableHead>
          <TableHead>Departure Airport</TableHead>
          <TableHead>Arrival Airport</TableHead>
          <TableHead>Check-In Baggage</TableHead>
          <TableHead>Cabin Baggage</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Adult Price A</TableHead>
          <TableHead>Child Price A</TableHead>
          <TableHead>Infant Price A</TableHead>
          <TableHead>Adult Price B</TableHead>
          <TableHead>Child Price B</TableHead>
          <TableHead>Infant Price B</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket, index) => (
          <TableRow key={index}>
            <TableCell>{ticket.airline}</TableCell>
            <TableCell>{ticket.flightNo}</TableCell>
            <TableCell>{ticket.seatsCount}</TableCell>
            <TableCell>{ticket.flightDeparture.toLocaleString()}</TableCell>
            <TableCell>{ticket.flightArrival.toLocaleString()}</TableCell>
            <TableCell>{ticket.departureAirport}</TableCell>
            <TableCell>{ticket.arrivalAirport}</TableCell>
            <TableCell>{ticket.checkInBaggage}</TableCell>
            <TableCell>{ticket.cabinBaggage}</TableCell>
            <TableCell>{ticket.class}</TableCell>
            <TableCell>{ticket.adultPrice_A}</TableCell>
            <TableCell>{ticket.childPrice_A}</TableCell>
            <TableCell>{ticket.infantPrice_A}</TableCell>
            <TableCell>{ticket.adultPrice_B}</TableCell>
            <TableCell>{ticket.childPrice_B}</TableCell>
            <TableCell>{ticket.infantPrice_B}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-haspopup="true"
                    size="icon"
                    variant="ghost"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
<div className="w-full">
          <Pagination className="!mx-0">
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
</div>
        </main>
  )
}
