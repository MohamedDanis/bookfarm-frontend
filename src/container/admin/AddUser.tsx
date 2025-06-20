import {useState} from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import UserStepper from '@/components/entry/UserStepper'

const AddBook = () => {
  const [open,setOpen]=useState(false)
  // const handleOpenChange = (newOpen:boolean) => {
  //   setOpen(newOpen);
  // };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild >
      <Button variant="primary">Add User</Button>
    </DialogTrigger>
    <DialogContent className='overflow-y-scroll max-w-3xl max-h-[90vh]'>
      <DialogHeader>
        <DialogTitle className='text-center'>Create New User</DialogTitle>
      </DialogHeader>
      {/* <UserForm onOpenChange={handleOpenChange}/> */}
      <UserStepper/>
      {/* <MultiForm/> */}
    </DialogContent>
  </Dialog>
      
  )
}

export default AddBook