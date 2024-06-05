import React, { useState } from "react";
import { BookForm } from "@/components/entry";
import { SampleForm } from "@/components/entry";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AddBook = () => {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary">Add Book</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Add Book</DialogTitle>
        </DialogHeader>
        <SampleForm onOpenChange={handleOpenChange} />
      </DialogContent>
    </Dialog>
  );
};

export default AddBook;
