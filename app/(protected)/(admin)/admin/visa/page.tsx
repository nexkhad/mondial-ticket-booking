import Image from "next/image";
import Link from "next/link";
import { File, FileIcon, ImageIcon, ListFilter, Mail, MoreHorizontal, Phone, PlusCircle } from "lucide-react";


import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrismaClient } from "@prisma/client";
import UserActions from "../../_components/usersAction";

export default async function Users() {
  const prisma = new PrismaClient();

  const applications = await prisma.visaApplication.findMany({});
  await prisma.$disconnect();

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
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-7 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Link
              href="/admin/users/create"
              className="h-7 gap-1 flex bg-primary text-primary-foreground items-center px-2 py-1 rounded-sm"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Users
              </span>
            </Link>
          </div>
        </div>
        <TabsContent value="all" className="overflow-x-auto w-[calc(100vw-2rem)] lg:w-full">
          <Card x-chunk="dashboard-06-chunk-0" className="overflow-auto">
            <CardHeader>
              <CardTitle>Visa</CardTitle>
              <CardDescription>
                Manage your Visa Applications and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
            <Table>
  <TableHeader>
    <TableRow>
      <TableHead>Application ID</TableHead>
      <TableHead>Visa Type</TableHead>
      <TableHead>Visa Duration</TableHead>
      <TableHead>Passport Number</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Typing Status</TableHead>
      <TableHead>Automation Status</TableHead>
      <TableHead>Applied By</TableHead>
      <TableHead>
        <span className="sr-only">Actions</span>
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {applications.map((app) => (
      <TableRow key={app.id}>
        <TableCell className="font-medium">{app.id}</TableCell>
        <TableCell>{app.visaType}</TableCell>
        <TableCell>{app.visaDuration}</TableCell>
        <TableCell>{app.passportNumber}</TableCell>
        <TableCell>{app.status}</TableCell>
        <TableCell>{app.typingStatus}</TableCell>
        <TableCell>{app.automationStatus}</TableCell>
        <TableCell>{app.appliedBy}</TableCell>
        {/* <TableCell>
          <ApplicationActions application={app} />
        </TableCell> */}
      </TableRow>
    ))}
  </TableBody>
</Table>

            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
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
  );
}
