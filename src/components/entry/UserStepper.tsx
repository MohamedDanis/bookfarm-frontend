import { useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { defineStepper } from '../stepper';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, Check, ChevronsUpDown, Library, PlusCircle, Search, Trash2 } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import {  createUserWithBooks } from '@/api/admin/userRequests';
import { toast, useToast } from '../ui/use-toast';
import { Card, CardContent } from '../ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { ScrollArea } from '../ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider } from '../ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { Badge } from '../ui/badge';
import { searchBook } from '@/api/admin/BookRequests';
const accountFormSchema = z.object({
  name: z.string().min(5, "name should be atleast 5 characters"),
  email: z.string().email("Invalid email address"),
  place: z.string().min(4, "place should be atleast 5 characters"),
  phonenumber: z.string().refine((value) => {
    const digits = value.replace(/\D/g, '');
    return digits.length === 10;
  }, {
    message: 'Invalid phone number',
  }).transform((value) => parseInt(value, 10))
});
const paymentSchema = z.object({
  payment_date: z.date({
    required_error: "Payment date is required.",
  }),
  paymentMode: z.string({
    required_error: "Payment mode is required.",
  }),
})
const borrowSchema = z.object({
  bookIds: z.array(z.object({
    id: z.string(),
    name: z.string(),
    borrowedDate: z.date(),
  }))
});
  
  // const paymentSchema = z.object({
  //   cardNumber: z.string().min(16, 'Card number is required'),
  //   expirationDate: z.string().min(5, 'Expiration date is required'),
  //   cvv: z.string().min(3, 'CVV is required'),
  // });
  
  type AccountFormValues = z.infer<typeof accountFormSchema>;
  type PaymentFormValues = z.infer<typeof paymentSchema>;
  type BorrowFormValues = z.infer<typeof borrowSchema>;
  const { useStepper, steps, utils } = defineStepper(
    { id: 'shipping', label: 'Basic', schema: accountFormSchema },
    { id: 'payment', label: 'Subscription', schema: paymentSchema },
    { id: 'complete', label: 'Borrow', schema: borrowSchema },
  );
const UserStepper = () => {
    const stepper = useStepper();
    const [formData, setFormData] = React.useState({});
  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(stepper.current.schema),
  });
  console.log(stepper);
  console.log(formData);
  
  const onSubmit = async(values: z.infer<typeof stepper.current.schema>) => {
    // biome-ignore lint/suspicious/noConsoleLog: <We want to log the form values>
    console.log(values);
    try {
      const allFormData = { ...formData, ...values };
      if (stepper.isLast) {
        console.log('All form data:', allFormData);
        // Combine all previous data with current values
        const res = await createUserWithBooks(allFormData);
        console.log(res.data, 'Response');
        if(res.data){
          toast({
            variant: "destructive",
            title: res.data.message,
          });
        }
        stepper.reset();
    } else {
        // Store the current step's data
        setFormData(prev => ({ ...prev, ...values }));
        stepper.next();
    }
    } catch (error) {
      console.log('Error submitting form:', error);
    }
  
  };

  const currentIndex = utils.getIndex(stepper.current.id);
  return (
    <Form {...form}>
    <form
      onSubmit={form.handleSubmit((data) => onSubmit(data as any))}
      className="p-6 space-y-6 w-full rounded-lg border"
    >
      <div className="flex justify-between">
        <h2 className="text-lg font-medium">Add User</h2>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-muted-foreground">
            Step {currentIndex + 1} of {steps.length}
          </span>
        </div>
      </div>
      <nav aria-label="Checkout Steps" className="my-4 group">
        <ol
          className="flex gap-2 justify-between items-center"
          aria-orientation="horizontal"
        >
          {stepper.all.map((step, index, array) => (
            <React.Fragment key={step.id}>
              <li className="flex flex-shrink-0 gap-4 items-center">
                <Button
                  type="button"
                  role="tab"
                  variant={index <= currentIndex ? 'default' : 'secondary'}
                  aria-current={
                    stepper.current.id === step.id ? 'step' : undefined
                  }
                  aria-posinset={index + 1}
                  aria-setsize={steps.length}
                  aria-selected={stepper.current.id === step.id}
                  className="flex justify-center items-center rounded-full size-10"
                  onClick={async () => {
                    const valid = await form.trigger();
                    //must be validated
                    if (!valid) return;
                    //can't skip steps forwards but can go back anywhere if validated
                    if (index - currentIndex > 1) return;
                    stepper.goTo(step.id);
                  }}
                >
                  {index + 1}
                </Button>
                <span className="text-sm font-medium">{step.label}</span>
              </li>
              {index < array.length - 1 && (
                <Separator
                  className={`flex-1 ${
                    index < currentIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
      <div className="space-y-4">
        {stepper.switch({
          shipping: () => <ShippingComponent />,
          payment: () => <PaymentComponent />,
          complete: () => <CompleteComponent />,
        })}
        {!stepper.isLast ? (
          <div className="flex gap-4 justify-end">
            <Button
              variant="secondary"
              onClick={stepper.prev}
              disabled={stepper.isFirst}
            >
              Back
            </Button>
            <Button type="submit">
              {stepper.isLast ? 'Complete' : 'Next'}
            </Button>
          </div>
        ) : (
          <Button type="submit">
          {stepper.isLast ? 'Complete' : 'Next'}
        </Button>
        )}
      </div>
    </form>
  </Form>
  )
}
function ShippingComponent() {
    const {
      register,
      formState: { errors },
    } = useFormContext<AccountFormValues>();
    console.log(errors,'df');
    
    return (
      <div className="space-y-4 text-start">
        <FormField
          // control={form.control}
          {...register('name')}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} className="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          // control={form.control}
          {...register('email')}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} className="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          // control={form.control}
          {...register('phonenumber')}
          name="phonenumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Your name" type="text" {...field} className="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          // control={form.control}
          {...register('place')}
          name="place"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Place</FormLabel>
              <FormControl>
                <Input placeholder="Your place" {...field} className="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }
  
  function PaymentComponent() {
    const {
      register,
      formState: { errors },
    } = useFormContext<PaymentFormValues>();
    console.log(errors,'df');
    
    return (
      <div className="space-y-4 text-start">
      <FormField
              // control={form.control}
              {...register('payment_date')}
              name="payment_date"
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
              // control={form.control}
              {...register('paymentMode')}
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
      </div>
    );
  }
  
function CompleteComponent() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<BorrowFormValues>();
  console.log(errors);
  

  const [bookSearchOpen, setBookSearchOpen] = useState(false)
  const [dateOpen, setDateOpen] = useState(false)
  const [searchResult, setSearchResult] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<any | null>(null)
  const [borrowedDate, setBorrowedDate] = useState<Date | undefined>(new Date())
  
  // Initialize bookIds field with empty array to avoid invalid_type error
  useEffect(() => {
    setValue('bookIds', [])
  }, [setValue])

  const borrowedBooks = watch('bookIds') || []
  const { toast } = useToast()

  useEffect(() => {
    const fetchSearch = async () => {
      const res = await searchBook(search);
      setSearchResult(res);
    };
    if (search.length === 0 || search.length > 2) {
      fetchSearch();
    }
  }, [search]);

  const handleAddBook = () => {
    if (selectedBook && borrowedDate) {
      const isBookAlreadyAdded = borrowedBooks.some((book) => book.id === selectedBook._id)

      if (isBookAlreadyAdded) {
        toast({
          title: "Book already added",
          description: `"${selectedBook.title}" is already in your borrowing list.`,
          variant: "destructive",
        })
        return
      }

      const newBook = {
        id: selectedBook._id, // Use _id instead of id to match MongoDB document
        name: selectedBook.title,
        borrowedDate: borrowedDate,
      }

      setValue('bookIds', [...borrowedBooks, newBook])

      toast({
        title: "Book added",
        description: `"${selectedBook.title}" has been added to your borrowing list.`,
      })

      setSelectedBook(null)
      setBorrowedDate(new Date())
    }
  }

  const handleRemoveBook = (id: number, title: string) => {
    setValue('bookIds', borrowedBooks.filter((book) => book.id.toString() === id.toString()))
    toast({
      title: "Book removed", 
      description: `"${title}" has been removed from your borrowing list.`,
    })
  }
  console.log(searchResult);
  
  return(
    <TooltipProvider>
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
                <div className="space-y-2">
                  <label htmlFor="book" className="text-sm font-medium leading-none">
                    Find a book
                  </label>
                  <Popover open={bookSearchOpen} onOpenChange={setBookSearchOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={bookSearchOpen}
                        className="justify-between w-full"
                        data-testid="book-search"
                      >
                        {selectedBook ? (
                          <div className="flex gap-2 items-center">
                            <img
                              src={selectedBook.coverimage || "/placeholder.svg"}
                              alt=""
                              className="object-cover w-5 h-6 rounded-sm"
                            />
                            <span className="truncate">{selectedBook.title}</span>
                          </div>
                        ) : (
                          "Search by title or author..."
                        )}
                        <ChevronsUpDown className="ml-2 w-4 h-4 opacity-50 shrink-0" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0" align="start">
                      <Command>
                        <CommandInput 
                          placeholder="Search books..." 
                          value={search}
                          onValueChange={setSearch}
                          className="h-9" 
                        />
                        <CommandList>
                          <CommandEmpty>
                            <div className="py-6 text-sm text-center">
                              <Search className="mx-auto mb-2 w-10 h-10 text-muted-foreground" />
                              No books found. Try a different search.
                            </div>
                          </CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-[300px]">
                              {searchResult.map((book:any) => (
                                <CommandItem
                                  key={book._id}
                                  disabled={book.availability == 0}
                                  value={`${book.title} ${book.author}`}
                                  onSelect={() => {
                                    setSelectedBook(book)
                                    setBookSearchOpen(false)
                                  }}
                                  className="py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <div className="flex gap-3 items-center disabled:opacity-45">
                                    <img
                                      src={book.coverimage || "/placeholder.svg"}
                                      alt=""
                                      className="object-cover w-8 h-10 rounded-sm disabled:opacity-50"
                                    />
                                    <div className="overflow-hidden flex-1">
                                      <p className="font-medium truncate">{book.title}</p>
                                      <p className="text-xs truncate text-muted-foreground">{book.author}</p>
                                    </div>
                                    {selectedBook?.id === book._id && (
                                      <Check className="w-4 h-4 text-primary shrink-0" />
                                    )}
                                  </div>
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium leading-none">
                    Borrow date
                  </label>
                  <Popover open={dateOpen} onOpenChange={setDateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[180px] justify-start text-left font-normal",
                          !borrowedDate && "text-muted-foreground",
                        )}
                        data-testid="date-picker"
                      >
                        <CalendarIcon className="mr-2 w-4 h-4" />
                        {borrowedDate ? format(borrowedDate, "MMM d, yyyy") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-auto" align="end">
                      <Calendar
                        mode="single"
                        selected={borrowedDate}
                        onSelect={(date) => {
                          setBorrowedDate(date)
                          setDateOpen(false)
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      onClick={handleAddBook}
                      disabled={!selectedBook || !borrowedDate}
                    >
                      <PlusCircle className="mr-2 w-4 h-4" />
                      Add to Borrowing List
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {!selectedBook
                    ? "Please select a book first"
                    : !borrowedDate
                      ? "Please select a date"
                      : "Add this book to your borrowing list"}
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Your borrowing list</h3>
            <Badge variant="outline">
              {borrowedBooks.length} {borrowedBooks.length === 1 ? "book" : "books"}
            </Badge>
          </div>

          {borrowedBooks.length === 0 ? (
            <div className="p-6 text-center rounded-lg bg-muted/50">
              <Library className="mx-auto mb-3 w-12 h-12 text-muted-foreground" />
              <p className="text-muted-foreground">Your borrowing list is empty</p>
              <p className="mt-1 text-xs text-muted-foreground">Search for books above and add them to your list</p>
            </div>
          ) : (
            <ScrollArea className="h-[250px] rounded-md border">
              <div className="p-4 space-y-3">
                {borrowedBooks.map((book: any) => (
                  <div
                    key={`${book.id}-${book.borrowedDate.toISOString()}`}
                    className="flex gap-3 items-center p-3 rounded-md border bg-card"
                  >
                    <img
                      src={book.coverimage || "/placeholder.svg"}
                      alt=""
                      className="object-cover w-12 h-16 rounded-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{book.name}</p>
                      <Badge variant="secondary" className="mt-1">
                        {format(new Date(book.borrowedDate), "MMM d, yyyy")}
                      </Badge>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                          onClick={() => handleRemoveBook(book.id, book.name)}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="sr-only">Remove {book.name}</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">Remove from list</TooltipContent>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
export default UserStepper