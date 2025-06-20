import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeSubscription,  userDetails } from "@/api/admin/userRequests";
import { useToast } from "@/components/ui/use-toast";
// import useRazorpay from "react-razorpay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Container from "@/components/ui/container";
import moment from "moment";
import Breadcrumb from "@/components/general/BreadCrump";
import { Button } from "@/components/ui/button";
import { BookOpen, CalendarIcon, Clock, Edit, Mountain, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DateProgress, HistoryTable, PersonalCard } from "@/container/admin";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { adminApi } from '@/utils/ApiCalls'
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
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { borrowBookUser, searchBook } from "@/api/admin/BookRequests";
import Table from "@/container/admin/BorrowTable/Table";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";

function calculateRemainingDays(endDate: any) {
  const end: any = new Date(endDate);
  const today: any = new Date();
  const timeDifference = end - today;
  const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return remainingDays;
}
const formSchema = z.object({
  paymentDate: z.date({
    required_error: "Payment date is required.",
  }),
  paymentTime: z.string({
    required_error: "Payment time is required.",
  }),
  paymentMode: z.string({
    required_error: "Payment mode is required.",
  }),
})

const UserDetailsPage = () => {
  const { toast } = useToast();
  const [userdetails, setUserDetails] = useState<any | null>(null);
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>([]);
  const [selectedbooks, setSelectedBooks] = useState<any>([]);
  // const [Razorpay] = useRazorpay();
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentTime: "",
      paymentMode: "",
    },
  })

  
  // const initPayment = async (data: any) => {
  //   const options = {
  //     key: "rzp_test_R1KnSKz17gXBmL",
  //     amount: data.amount,
  //     currency: data.currency,
  //     name: 'monthly subscription',
  //     description: "Test Transaction",
  //     order_id: data.id,
  //     handler: async (response: any) => {
  //       console.log(response);

  //       try {
  //         const { data } = await adminApi.post('/payment/verify', response);
  //         console.log(data);
  //         return true
  //       } catch (error) {
  //         console.log(error);
  //         return false
  //       }
  //     },
  //     theme: {
  //       color: "#3399cc",
  //     },

  //   };
  //   const rzp1 = new Razorpay(options);
  //   rzp1.open();
  // }

  const handleCheckboxChange = (bookId: string, bookTitle: string) => {
    if (selectedbooks.some((book: any) => book.id === bookId)) {
      setSelectedBooks(selectedbooks.filter((book: any) => book.id !== bookId));
    } else {
      setSelectedBooks([...selectedbooks, { id: bookId, name: bookTitle }]);
    }
  };

  const borrowBook = async () => {
    const res = await borrowBookUser(selectedbooks, userdetails?.id);
    console.log(res.data);
    if (!res.data.stack) {
      toast({
        title: "Book Borrowed Successfully",
        description: `Borrowed Books are ${selectedbooks.map(
          (book: any) => book.name
        )}`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Book Borrow Failed",
        description: `error: ${res.data.message}`,
      });
    }
  };
  //   const router = useNavigate();
  let { id } = useParams();
  console.log(id);
  const getuserDetails = async () => {
    const res = await userDetails(id);
    setUserDetails(res);
  };
  //   const id = router.query.id as string;
  useEffect(() => {
    const fetchSearch = async () => {
      const res = await searchBook(search);
      setSearchResult(res);
    };
    if (search.length === 0 || search.length > 2) {
      fetchSearch();
    }
   
    if (id === undefined) {
      console.log("fetching data");
    } else {
      getuserDetails();
    }
  }, [id, search]);
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    console.log(userDetails);
    makeSubscription(userdetails?.id,values)
    toast({
      title: "Subscribed Successfully",
      description: `${userdetails.name} have successfully subscribed`,
    });
    getuserDetails();
    setOpen(false)
    // Here you would typically send the data to your backend
  }

  return (

    <div className="">
      {
        userdetails ? (
          <Container className="p-4">
            <Breadcrumb terminalPath={userdetails?.name} />
            <div className="flex flex-col md:justify-between md:flex-row">
              <div className="flex gap-8 items-center mt-6 w-full md:flex-col md:items-start md:w-2/3">
                <Avatar className="w-28 h-28 md:h-36 md:w-36">
                  <AvatarImage src="/imgs/avatar-image.png" />
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-4 justify-start items-start md:items-center md:flex-row">
                  {userdetails ? (
                    <h1 className="text-2xl font-semibold md:text-4xl">
                      {userdetails?.name}
                    </h1>
                  ) : (
                    <Skeleton className="w-[200px] h-[30px] rounded-full" />
                  )}
                  <div
                    className={`px-3 md:py-1 py-[2px] text-xs md:text-sm rounded-full grid place-items-center font-bold ${userdetails?.isSubscribed
                        ? "bg-[#7AC88B] text-[#28432E]"
                        : "bg-[#C87F7A] text-[#432E28]"
                      }`}
                  >
                    {userdetails?.isSubscribed ? "Subscribed" : "Not subscribed"}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-end w-full md:w-1/3">
                {userdetails?.isSubscribed && (
                  <div className="p-3 mt-6 w-full h-60 rounded-2xl border border-black dark:border-slate-50">
                    <h1 className="text-xl font-bold text-center md:text-2xl">
                      Subscription Details
                    </h1>
                    <h2 className="my-4 text-sm">
                      End Date :
                      <span className="font-bold">
                        {moment(userdetails?.subscriptionEnd).format("DD-MM-YYYY")}
                      </span>{" "}
                    </h2>
                    <div className="flex flex-col gap-4 justify-center items-center">
                      <h1 className="flex gap-2 text-sm font-bold text-center">
                        <Clock />{" "}
                        {calculateRemainingDays(userdetails?.subscriptionEnd)} days
                        left{" "}
                      </h1>
                      <DateProgress
                        endDate={calculateRemainingDays(
                          userdetails?.subscriptionEnd
                        )}
                      />
                      <div className="flex gap-4">
                        <Button className="">Renew Plan</Button>
                        <Button className="" variant="primary">
                          Send Alert
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex justify-evenly mt-6 w-full">
                  {userdetails?.isSubscribed ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-[#547C5A] dark:text-slate-100 dark:hover:text-slate-600">
                          <XCircle size={15} />
                          Cancel
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <Dialog  open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button
                          className="bg-[#547C5A] dark:text-slate-100"
                          // onClick={() => subscribeUser()}
                        >
                          <Mountain size={15} />
                          Subscribe
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Subscription Details</DialogTitle>
          <DialogDescription>Enter the payment date, time, and mode of payment.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="py-4 space-y-4">
            <FormField
              control={form.control}
              name="paymentDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Payment Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Select date</span>}
                          <CalendarIcon className="ml-auto w-4 h-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-auto" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="paymentTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Time</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="time" placeholder="Select time" {...field} />
                      <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="paymentMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Mode</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment mode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="credit_card">Credit Card</SelectItem>
                      <SelectItem value="debit_card">Debit Card</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="wallet">Digital Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
             
                setOpen(false)
              }}>
                Cancel
              </Button>
              <Button type="submit">Subscribe Now</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
                    </Dialog>

                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center dark:text-slate-100 dark:hover:text-slate-600 bg-[#634532] gap-2">
                        <BookOpen size={15} />
                        Borrow
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Search For Books</DialogTitle>
                        <DialogDescription>
                          Search for books to borrow
                        </DialogDescription>
                      </DialogHeader>
                      <Input
                        type="text"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setSearch(e.target.value.toLowerCase())
                        }
                        placeholder="Search books..."
                      />
                      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                        {searchResult &&
                          searchResult.map((book: any) => {
                            if (book.availability > 0) {
                              return (
                                <div className="flex gap-4 items-center p-3 my-4 border">
                                  <Input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    onChange={() =>
                                      handleCheckboxChange(book._id, book.title)
                                    }
                                    checked={selectedbooks.some(
                                      (selectedBook: any) =>
                                        selectedBook.id === book._id
                                    )}
                                  />
                                  <img
                                    src={book?.coverimage}
                                    alt="cover"
                                    width={60}
                                    height={150}
                                  />
                                  <h1 className="text-lg font-semibold">
                                    {book?.title}
                                  </h1>
                                </div>
                              );
                            } else {
                              return (
                                <div className="flex gap-4 items-center p-3 my-4 bg-gray-200 border">
                                  <Input
                                    type="checkbox"
                                    disabled
                                    className="w-4 h-4"
                                    onChange={() =>
                                      handleCheckboxChange(book._id, book.title)
                                    }
                                    checked={selectedbooks.some(
                                      (selectedBook: any) =>
                                        selectedBook.id === book._id
                                    )}
                                  />
                                  <img
                                    src={book?.coverimage}
                                    alt="cover"
                                    width={60}
                                    height={150}
                                  />
                                  <h1 className="text-lg font-semibold text-gray-500">
                                    {book?.title}
                                  </h1>
                                </div>
                              );
                            }
                          })}
                      </ScrollArea>
                      <DialogFooter className="flex w-full h-auto md:flex-col">
                        <h1 className="text-lg">Selected Books :</h1>
                        <div className="flex flex-col">
                          {selectedbooks.map((selectBook: any, index: any) => {
                            return <p key={index}>{selectBook.name}</p>;
                          })}
                        </div>
                        <Button
                          className="bg-[#0F452E] text-white"
                          onClick={() => borrowBook()}
                        >
                          Borrow
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost">
                    <Edit size={15} />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col gap-4 md:flex-row">
              {userdetails && <PersonalCard userdata={userdetails} />}
              <div className="flex-1 p-4 w-2/3 rounded-2xl border">
                <h1 className="text-2xl font-bold">Borrowed Books :</h1>
                <Table borrowData={userdetails} />
              </div>
            </div>
            <div className="p-4 my-6 rounded-2xl border">
              <h1 className="text-2xl font-bold">Books History :</h1>
              <HistoryTable booksHistory={userdetails?.borrowHistory || []} />
            </div>
          </Container>
        ) : (
          <div>Loading</div>
        )
      }

    </div>

  );
};

export default UserDetailsPage;
