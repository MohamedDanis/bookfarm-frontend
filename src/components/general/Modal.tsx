import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { DropdownMenuItem } from '../ui/dropdown-menu';

const Modal = () => {
    const [editopen, setEditOpen] = React.useState(false);
    const handleOpenChange = (newOpen: boolean) => {
      console.log("handleOpenChange called with:", newOpen);
      setEditOpen(newOpen);
      console.log("editopen is now:", editopen);
    };
  return (
    <Dialog open={editopen} onOpenChange={setEditOpen}>
    <DialogTrigger asChild>
    <DropdownMenuItem className="text-center text-blue-700">
    Edit
  </DropdownMenuItem>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-center">Add Book</DialogTitle>
      </DialogHeader>
      {/* <BookForm onOpenChange={handleOpenChange}/> */}
      {/* <SampleForm onOpenChange={handleOpenChange} /> */}
      hello
    </DialogContent>
  </Dialog>
  )
}

export default Modal