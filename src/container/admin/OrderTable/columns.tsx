import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, ArrowUpDownIcon, MoreHorizontal } from "lucide-react";
import { OrderProps } from "@/utils/types";
import moment from "moment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { changeOrderStatus, returnBookUser } from "@/api/admin/BookRequests";
import { Separator } from "@/components/ui/separator";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want

const handleStatus = async (id: any, event: any) => {
  try {
    console.log(event);
    const res = await changeOrderStatus(id, event);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const columns: ColumnDef<OrderProps>[] = [
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
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "orderId",
    header: "OrderID",
    cell: ({ row }) => {
      console.log(row.original.products);
      
      return (
        <Dialog>
          <DialogTrigger asChild>
            <p className="cursor-pointer">{row?.original?.orderId}</p>
          </DialogTrigger>
          <DialogContent className=" md:w-[800px] ">
            <DialogHeader>
              <DialogTitle className="text-center">Order Details</DialogTitle>
              <Separator />
            </DialogHeader>
           
            <Tabs defaultValue="delivery" className="w-full focus-visible:ring-0">
              <TabsList>
                <TabsTrigger value="delivery">Delivery Details</TabsTrigger>
                <TabsTrigger value="product">Products Detail</TabsTrigger>
              </TabsList>
              <TabsContent value="delivery" className="outline-none">
              <div className=" flex flex-col gap-4">
              <h1 className="text-xl">
                OrderId :{" "}
                <span className="font-light">{row.original.orderId}</span>
              </h1>
              <h2 className="text-lg">User : <span className="font-light">{row.original.userId.name}</span></h2>
              <h1 className="text-xl font-medium">Delivery Details :</h1>
              <h2>Name ; {row.original.deliveryDetails.name}</h2>
              <h2><span className="font-medium">Address :</span>{row.original.deliveryDetails.address1}<br/> {row.original.deliveryDetails.address2}<br/>{row.original.deliveryDetails.city}<br/>{row.original.deliveryDetails.state}-{row.original.deliveryDetails.pincode}</h2>
              <h2 className="font-medium">Mobile : <span className="font-light">{row.original.deliveryDetails.mobile}</span></h2>
            </div>
              </TabsContent>
              <TabsContent value="product">
                {
                  row.original.products.map((item:any)=>(
                    <h3>{item?.productId?.title}</h3>
                  ))
                }
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <Link to={`users/${row.original.userId._id}`}>
          {row?.original?.userId?.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      return (
        <p className="font-outfit">{row?.original?.deliveryDetails.address2}</p>
      );
    },
  },
  {
    accessorKey: "Date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Date
          <ArrowUpDownIcon className="w-4 h-4 ml-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p>{moment(row?.original?.createdAt).format("YYYY-MM-DD HH:mm:ss")}</p>
      );
    },
    enableSorting: true,
  },

  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Status
          <ArrowUpDownIcon className="w-4 h-4 ml-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Select
          defaultValue={row?.original?.status}
          onValueChange={(e: any) => handleStatus(row?.original?._id, e)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={row?.original?.status} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ordered">Ordered</SelectItem>
            <SelectItem value="Dispatching">Dispatching</SelectItem>
            <SelectItem value="In-transit">In-transit</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const { toast } = useToast();
      console.log(user);

      const returnBook = async (id: string, userid: string) => {
        console.log(userid);

        await returnBookUser(id, userid);
        toast({
          variant: "destructive",
          title: "Book Returned",
          description: `Book Returned successfully`,
        });
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
            // onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              {/* <Link to={`users/${user.id}`}>
              View customer
              </Link> */}
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <AlertDialog>
                <AlertDialogTrigger>Return</AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your book and remove your book from the database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button variant="destructive">Return</Button>
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
