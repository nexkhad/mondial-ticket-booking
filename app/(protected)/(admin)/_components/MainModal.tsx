"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { ExpandIcon, File, FileIcon, ImageIcon, ListFilter, Mail, MoreHorizontal, Phone, PlusCircle } from "lucide-react";
import HandleStatusChange from './handleStatusChange';
import AlertDialogConfirmation from './alertDialogConfirmation';
const mainModal = ({depRequest}:{depRequest:any}) => {
    const [isOpen,setOpen]=useState(false);
  return (
    <>
  <Dialog >
              <DialogTrigger>
                <ExpandIcon className="h-4 w-4 opacity-50 mx-auto hover:scale-150 cursor-pointer" onClick={()=>setOpen(true)} />
              </DialogTrigger>
              {isOpen&&(<DialogContent className="p-5 border border-gray-300">
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



            <AlertDialogConfirmation depRequest={depRequest} setOpen={setOpen}  />
        

      </DialogContent>)}
    </Dialog>
    </>
  )
}

export default mainModal