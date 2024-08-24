"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/router";
import { deleteRecord } from "@/lib/deletePaymentRcrd";
import { getRecord } from "@/lib/getRecords";

const AlertDialogConfirmation = ({ depRequest ,setOpen }: { depRequest: any ,setOpen: ()=>void }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<string | null>(null);

//   const router = useRouter();

  const handleSaveClick = () => {
    setActionType('save');
    setIsDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setActionType('delete');
    setIsDialogOpen(true);
  };

  const handleConfirm = async () => {
    
    try {
      setOpen(false);
      if (actionType === 'delete') {

       const data = await deleteRecord(depRequest.id);
       
         await getRecord()
       
      }
      setIsDialogOpen(false);
      window.location.reload()
    //   router.reload(); // Refreshes the page
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="mt-2 flex justify-end gap-4">
        <Button variant="destructive" onClick={handleDeleteClick}>
          Delete
        </Button>
        <Button variant="default" onClick={handleSaveClick}>
          Save
        </Button>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === 'save' ? 'Confirm Save' : 'Confirm Delete'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === 'save' ? 'Are you sure you want to save this status?' : 'Are you sure you want to delete this record?'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AlertDialogConfirmation;
