
import Link from "next/link";
import { ExpandIcon, File, FileIcon, ImageIcon, ListFilter, Mail, MoreHorizontal, Phone, PlusCircle } from "lucide-react";
import MainModal from "../../_components/MainModal";
import RecordsTable from "../../_components/RecordsTable";
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



import HandleStatusChange from "../../_components/handleStatusChange";
import AlertDialogConfirmation from "../../_components/alertDialogConfirmation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrismaClient } from "@prisma/client";
import { getRecord } from "@/lib/getRecords";



export default async function DepositRequest({depositRequests}:{depositRequests: any}) {


  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 sm:gap-8">
      <RecordsTable/>
    </main>
  );
}