"use client";
import React from 'react'
import Link from "next/link";
import { ExpandIcon, File, FileIcon, ImageIcon, ListFilter, Mail, MoreHorizontal, Phone, PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
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
import HandleStatusChange from './handleStatusChange';
import AlertDialogConfirmation from './alertDialogConfirmation';

const mainModal = ({depositRequests}:{depositRequests:any}) => {



    const handleClose=()=>{

    }
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 sm:gap-8">
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Inactive</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-1">
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
            <CardTitle>Request</CardTitle>
            <CardDescription>
              List of all Request for money deposite.
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
          <Table>
    <TableHeader>
      <TableRow>
        
        <TableHead>Office Name</TableHead>
        <TableHead>Depositor Name</TableHead>
        <TableHead>Bank Account</TableHead>
        <TableHead>Bank Reference</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-center">
          <span className="">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {depositRequests.map((depRequest:any) => (
        <TableRow key={depRequest.id}>
          <TableCell>{depRequest.user.officeName}</TableCell> {/* Accessing related User data */}
          <TableCell>{depRequest.depositorName}</TableCell>
          <TableCell>{depRequest.bankAccount}</TableCell>
          <TableCell>{depRequest.bankRef}</TableCell>
          <TableCell>{depRequest.amount}</TableCell>
          <TableCell>{depRequest.status}</TableCell>
          <TableCell className="text-center">
            <Dialog>
            <DialogTrigger>
              <ExpandIcon className="h-4 w-4 opacity-50 mx-auto hover:scale-150 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="p-5 border border-gray-300">
            <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center border-b-2 border-gray-300 pb-1">Payment Request Details</DialogTitle>
              {/* <DialogDescription className="text-gray-300 text-center mt-2"> */}
                {/* Additional description or instructions */}
              {/* </DialogDescription> */}
            </DialogHeader>
            <div className="space-y-4 mt-3">
            <p className="text-md border border-gray-300 rounded-sm p-1"><strong>Office Name:</strong> {depRequest.user.officeName}</p>
            <p className="text-md border border-gray-300 rounded-sm p-1"><strong>Depositor Name:</strong> {depRequest.depositorName}</p>
            <p className="text-md border border-gray-300 rounded-sm p-1"><strong>Bank Account:</strong> {depRequest.bankAccount}</p>
            <p className="text-md border border-gray-300 rounded-sm p-1"><strong>Bank Reference:</strong> {depRequest.bankRef}</p>
            <p className="text-md border border-gray-300 rounded-sm p-1"><strong>Amount:</strong> {depRequest.amount}</p>
            <HandleStatusChange depRequest={depRequest} /> 
            </div>



          <AlertDialogConfirmation depRequest={depRequest} closeModal={handleClose}  />

      

    </DialogContent>
  </Dialog>
          </TableCell>
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
  )
}

export default mainModal