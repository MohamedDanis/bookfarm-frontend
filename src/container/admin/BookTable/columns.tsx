"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
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
import { deleteUser } from "@/api/admin/userRequests"
import { Link } from "react-router-dom"
import { deleteBook, returnBookUser } from "@/api/admin/BookRequests"
import { Switch } from "@/components/ui/switch"
import { changeSale } from "@/api/admin/adminAuthRequest"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    _id: string;
    title: string;
    author: string;
    sale:boolean;
  };
  
  export const columns: ColumnDef<Payment>[] = [
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
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0"
          >
            Book Name
            <ArrowUpDown className="w-4 h-4 ml-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">
        <Link to={`${row.original._id}`}>
          {row.getValue("title")}
        </Link>
        
        </div>, 
    },
    {
      accessorKey: "author",
      header: () => <div className="text-right">Author</div>,
    },
    {
      accessorKey: "sale",
      header: () => <div className="text-right">Sale</div>,
      cell:({row})=>(
        <Switch
          checked={row.getValue("sale")}
          onCheckedChange={async() => {
            
            const res  =await changeSale(row.original._id)
            console.log(res);
            
            // row.setValue("sale", value)
          }}
        />
      )
    },
    {
      accessorKey: "availability",
      header: () => <div className="text-right">Quantity</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
        const { toast } = useToast()
  
        const deleteABook = async(id:string)=>{
          console.log(id)
          const data= await deleteBook(id)
          toast({
            variant: "destructive",
            title: "Deleted",
            description: `Book deleted successfully`,
          })
          console.log(data,'delete');
          
        }
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment._id)}
              >
                Copy Book ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={`books/${payment._id}`}>View book details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-center ">
                <Link to={`edit/${payment._id}`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <AlertDialog>
                  <AlertDialogTrigger>Delete</AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Before you delete, make sure to remove the book from users. This will permanently delete
                        your book and remove your book from the database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction asChild onClick={()=>deleteABook(payment._id)}>
                        <Button variant='destructive'>Delete</Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
