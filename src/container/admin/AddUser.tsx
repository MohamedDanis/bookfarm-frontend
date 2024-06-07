import {useState} from 'react'
import {  UserForm } from '@/components/entry'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

const AddBook = () => {
  const [open,setOpen]=useState(false)
  const handleOpenChange = (newOpen:boolean) => {
    setOpen(newOpen);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild >
      <Button variant="primary">Add User</Button>
    </DialogTrigger>
    <DialogContent className=''>
      <DialogHeader>
        <DialogTitle className='text-center'>Create New User</DialogTitle>
      </DialogHeader>
      <UserForm onOpenChange={handleOpenChange}/>
      {/* <MultiForm/> */}
    </DialogContent>
  </Dialog>
      
  )
}

export default AddBook