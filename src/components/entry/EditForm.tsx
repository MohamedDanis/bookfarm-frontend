"use client";
interface BookFormProps {
  onOpenChange: OnOpenChangeCallback;
}
type OnOpenChangeCallback = (newOpen: boolean) => void;
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  editBook,
  showCategories,
} from "@/api/admin/BookRequests";
import img from "next/img";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, CheckIcon } from "lucide-react";
import { CaretSortIcon } from "@radix-ui/react-icons";
const css = `
.rdp {
  --rdp-cell-size: 40px; /* Size of the day cells. */
  --rdp-caption-font-size: 18px; /* Font size for the caption labels. */
  --rdp-accent-color: #0d1d1d; /* Accent color for the background of selected days. */
  --rdp-background-color: #e7edff; /* Background color for the hovered/focused elements. */
  --rdp-accent-color-dark: #3003e1; /* Accent color for the background of selected days (to use in dark-mode). */
  --rdp-background-color-dark: #180270; /* Background color for the hovered/focused elements (to use in dark-mode). */
  --rdp-outline: 2px solid var(--rdp-accent-color); /* Outline border for focused elements */
  --rdp-outline-selected: 3px solid var(--rdp-accent-color); /* Outline border for focused _and_ selected elements */
  --rdp-selected-color: #fff; /* Color of selected day text */
}
`
type bookDetailsProps = {
  id: number;
  title: string;
  author: string | any;
  genre: string;
  bookcover: string;
  description?: string;
  availablility: string;
  price?: number;
  discount?: number;
  language?: string;
  dop?: string;
  country?: string;
};
const MAX_FILE_SIZE = 500000;
const ACCEPTED_img_TYPES = [
  "img/jpeg",
  "img/jpg",
  "img/png",
  "img/webp",
];
const accountFormSchema = z.object({
  title: z.string().min(5, "bookname should be atleast 5 characters"),
  author: z.string().min(5, "author name should be atleast 5 characters"),
  genre: z.array(z.string(), {
    required_error: "Please select at least one genre.",
  }),
  quantity:z.string().refine((val) => !Number.isNaN(parseInt(val, 10))).optional(),
  description: z.string().min(5, "description should be atleast 5 characters").optional(),
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10))).optional(),
  dop: z.date({
    required_error: "A date of publish is required.",
  }).optional(),
  discount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10))).optional(),
  country: z.string().optional(),
  language: z.string().optional(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.

export function EditForm({ bookdetails }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<string>("");
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await showCategories();
      setGenre(res);
    };
    getCategories();
  }, []);

  const Quantitystr = bookdetails?.availability?.toString();
  const defaultValues: Partial<AccountFormValues> = {
    title: bookdetails?.title,
    author: bookdetails?.author,
    genre: bookdetails?.genre,
    quantity: Quantitystr,
  };
  console.log(defaultValues, "default");
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });
  // const preset_key = "bookfarm";
  // const cloud_name = "djl447xw2";

  async function onSubmit(values: z.infer<typeof accountFormSchema>) {
    console.log(values);
    
    setIsLoading(true);
    // const formdata = new FormData()
    // formdata.append("file", values.bookcover[0]);
    // formdata.append("upload_preset", preset_key);
    // const folderPath = "book-cover/";
    // formdata.append("folder", folderPath);
    // console.log(formdata);
    // const getPhoto = async () => {
    //   const url = await axios.post(
    //     `https://api.cloudinary.com/v1_1/${cloud_name}/img/upload`,
    //     formdata
    //   );
    //   return url;
    // };
    // const coverbook = await getPhoto();
    // console.log(coverbook.data.secure_url);
    // const newObj = {
    //   bookname: values.title,
    //   bookauthor: values.author,
    //   bookgenre: values.genre,
    //   bookcover: coverbook.data.secure_url,
    //   bookquantity: values.quantity,
    // };
   
    setIsLoading(false);
    const response = await editBook(bookdetails._id, values);
    if (response.data) {
      console.log(response);
      
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(values, null, 2)}</code>
          </pre>
        ),
      });
    }else{
      toast({
        variant: "destructive",
        title: response.data.message,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <div className="flex gap-6">
          <div className="w-1/2">
            <h1 className="text-3xl font-semibold">Bascic Details</h1>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bookname</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} className="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} className="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Book Genre</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                       {field.value && field.value.length > 0
                        ? `${field.value.length} genre selected`
                        : "Select Category"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search genre..."
                      className="h-9"
                    />
                    <CommandEmpty>No genre found.</CommandEmpty>
                    <CommandGroup>
                      {genre.map((gen:any,index) => (
                        <CommandItem
                          value={gen?.name}
                          key={index}
                          onSelect={()=>{
                            const selectedGenres = [...field.value];
                            if (!selectedGenres.includes(gen?.name)) {
                              selectedGenres.push(gen?.name);
                              form.setValue("genre", selectedGenres);
                            }else{
                              const selectedGenres = field.value.filter(
                                (selectedGenre: string) => selectedGenre !== gen?.name
                              );
                              form.setValue("genre", selectedGenres);
                            }
                          }}
                          // onSelect={() => {
                          //   form.setValue("genre", gen?.name)
                          // }}
                        >
                          {gen?.name}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              field.value.includes(gen?.name)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
            {/* <div className="flex gap-10 items-center w-full">
              <FormField
                control={form.control}
                name="bookcover"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Upload Book Cover</FormLabel>
                    <FormControl>
                      <Input
                        id="picture"
                        type="file"
                        className=""
                        {...form.register("bookcover", {
                          onChange: (e) => {
                            setFile(URL.createObjectURL(e.target.files[0]));
                          },
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {file ? (
                <FormDescription className="">
                  <img
                    src={file}
                    className=""
                    alt="hi"
                    width={100}
                    height={125}
                  />
                </FormDescription>
              ) : (
                <FormDescription className="">
                  <img
                    src={bookdetails?.coverimg}
                    className=""
                    alt="hi"
                    width={100}
                    height={125}
                  />
                </FormDescription>
              )}
            </div> */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Add your description"
                      id="message"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Quantity</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter book quantity"
                      type="text"
                      {...field}
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <h1 className="text-3xl font-semibold">Pricing Details</h1>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your price"
                      {...field}
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your discount"
                      {...field}
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="my-6">
              <h1 className="text-3xl font-semibold">Additional details</h1>
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your discount"
                        {...field}
                        className=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dop"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <style>{css}</style>
                        <DayPicker
                          mode="single" 
                          selected={field.value}
                          onSelect={field.onChange}
                          captionLayout="dropdown"
                          fromYear={1452}
                          toYear={2050}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your discount"
                        {...field}
                        className=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full my-6" disabled={isLoading}>
          {isLoading ? "Updating" : "Update Book"}
        </Button>
      </form>
    </Form>
  );
}
