import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, CalendarIcon, Home,  User } from "lucide-react"
import { BookHistoryTable } from "@/components/book-history-table"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
// import useRazorpay from "react-razorpay"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { borrowBookUser, searchBook } from "@/api/admin/BookRequests"
import { useParams } from "react-router-dom"
import { makeSubscription, userDetails } from "@/api/admin/userRequests"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import moment from "moment"
import { DateProgress } from "@/container/admin"
import Table from "@/container/admin/BorrowTable/Table"


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
export default function DetailedPage() {
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
    makeSubscription(userdetails?.id, values)
    toast({
      title: "Subscribed Successfully",
      description: `${userdetails.name} have successfully subscribed`,
    });
    getuserDetails();
    setOpen(false)
    // Here you would typically send the data to your backend
  }
  console.log(userdetails, 'jdhfg');

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* <Sidebar /> */}
      <div className="flex-1 p-8">
        <div className="flex items-center mb-6 text-sm text-muted-foreground">
          <Home className="mr-1 w-4 h-4" />
          <span>/admin/users/</span>
          <span className="ml-1 font-medium text-foreground">{userdetails?.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="flex flex-col gap-6 items-start md:flex-row md:items-center">
              <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                <AvatarFallback className="text-xl font-medium text-green-700 bg-green-100">MD</AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <div className="flex gap-3 items-center">
                  <h1 className="text-2xl font-bold">{userdetails?.name}</h1>
                  <Badge className={`text-green-700 bg-green-100 hover:bg-green-200 ${userdetails?.isSubscribed ? 'text-green-700 bg-green-100 hover:bg-green-200' : 'text-red-700 bg-red-100 hover:bg-red-200'}`}> {userdetails?.isSubscribed ? "Subscribed" : "Not subscribed"}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="inline-flex items-center">
                    <User className="mr-1 w-4 h-4" />
                    ID: #38291
                  </span>
                  <span className="mx-2">•</span>
                  <span>Member since: Jan 2023</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm">
                    <CalendarIcon className="mr-1 w-4 h-4" />
                    Send Alert
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        disabled={!userdetails?.isSubscribed}
                        size="sm" className="bg-green-600 hover:bg-green-700">
                        <BookOpen className="mr-1 w-4 h-4" />
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

                  <Button variant="outline" size="sm">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>

            <Tabs defaultValue="borrowed" className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="borrowed">Borrowed Books</TabsTrigger>
                <TabsTrigger value="history">Books History</TabsTrigger>
              </TabsList>
              <TabsContent value="borrowed" className="bg-white rounded-md shadow">
                {/* <BorrowedBooksTable borrowData={userdetails} /> */}
                <Table borrowData={userdetails} />
              </TabsContent>
              <TabsContent value="history" className="bg-white rounded-md shadow">
                <BookHistoryTable historyData={userdetails?.borrowHistory || []} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            {
              userdetails?.isSubscribed ? (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Subscription Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">End Date</span>
                      <span className="font-medium">{moment(userdetails?.subscriptionEnd).format("DD-MM-YYYY")}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{calculateRemainingDays(userdetails?.subscriptionEnd)} days left</span>
                        <span className="text-sm text-muted-foreground">30 days</span>
                      </div>
                      <DateProgress endDate={calculateRemainingDays(
                        userdetails?.subscriptionEnd
                      )} />
                      {/* <Progress value={calculateRemainingDays(userdetails?.subscriptionEnd)} className="h-2" /> */}
                    </div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                        <Button 
                    onClick={() => setOpen(true)}
                    className="w-full bg-green-600 hover:bg-green-700">Renew Plan</Button>
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
                 
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-red-50 border-red-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-red-800">No Active Subscription</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-red-700">
                        You currently don't have an active subscription. Subscribe now to enjoy full access to our library
                        services.
                      </p>
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-green-600 hover:bg-green-700">Subscribe Now</Button>
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

                      <div className="text-sm text-muted-foreground">
                        <p>Benefits of subscription:</p>
                        <ul className="pl-5 mt-2 space-y-1 list-disc">
                          <li>Borrow up to 7 books at a time</li>
                          <li>Access to premium collections</li>
                          <li>Reserve books in advance</li>
                          <li>Extended borrowing periods</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            }


            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-[20px_1fr] gap-x-3 gap-y-4 items-start">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{userdetails?.name}</p>
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <div>
                    <p className="text-sm text-muted-foreground">Mobile</p>
                    <p className="font-medium">{userdetails?.phone}</p>
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{userdetails?.email}</p>
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{userdetails?.place}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}