"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"

import { Link } from "react-router-dom"
import { returnBookUser } from "@/api/admin/BookRequests"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Borrow = {
  id: string,
  userID:string,
  name: string,
  author:string
}

export const columns: ColumnDef<Borrow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell:({row})=>{
      
      return <Link to={`users/${row.original.id}`}>{row?.original?.name}</Link>
    }
  },
  {
    accessorKey: "author",
    header: "author",
  },
  {
    accessorKey: "Date",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
      const {toast} = useToast()
      console.log(user);
      
      const returnBook = async(id:string,userid:string)=>{
        console.log(userid);
        
        await returnBookUser(id,userid)
        toast({
          variant: "destructive",
          title: "Book Returned",
          description: `Book Returned successfully`,
        })
        
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 w-8 h-8">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem asChild>
              <Link to={`users/${user.id}`}>
              View customer
              </Link>
              </DropdownMenuItem> */}
            <DropdownMenuItem asChild>
            <AlertDialog>
                <AlertDialogTrigger className="px-2 w-full bg-red-400 text-white font-medium rounded-md focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50">
                  Return
                  </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Return Book
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to return this book?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild onClick={()=>returnBook(user.id,user.userID)}>
                      <Button variant='destructive'>Return</Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
