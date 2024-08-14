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

export default function WalletHistory() {


  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center mt-24">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Inactive</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2 ">
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

          </div>
        </div>
        <TabsContent value="all" className="overflow-x-auto w-[calc(100vw-2rem)] lg:w-full">
          <Card x-chunk="dashboard-06-chunk-0" className="overflow-auto">
            <CardHeader>
              <CardTitle>Wallet History</CardTitle>
              <CardDescription>
                Review all wallet transactions
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
            <Table>
      <TableHeader>
        <TableRow>
          <TableHead>bankAccount</TableHead>
          <TableHead>depositorName</TableHead>
          <TableHead>bankRef</TableHead>
          <TableHead>status</TableHead>
          <TableHead>createdAt</TableHead>
          <TableHead>updatedAt</TableHead>
   
        </TableRow>
      </TableHeader>
      <TableBody>
          <TableRow>
            <TableCell>Dummy data</TableCell>
            <TableCell>Dummy data</TableCell>
            <TableCell>Dummy data</TableCell>
            <TableCell>Dummy data</TableCell>
            <TableCell>Dummy data</TableCell>
            <TableCell>Dummy data</TableCell>
          </TableRow>
        
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
