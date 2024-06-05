"use client";
interface BookFormProps {
  onOpenChange: OnOpenChangeCallback;
}
type OnOpenChangeCallback = (newOpen: boolean) => void;
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { addBook,showCategories } from "@/api/admin/BookRequests";
import { CheckIcon } from "lucide-react";
import { CaretSortIcon } from "@radix-ui/react-icons";

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
  bookcover: z
    .any()
    .refine((files) => files?.length == 1, "img is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_img_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  quantity: z.string().refine((val) => !Number.isNaN(parseInt(val, 10))),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  title: "",
  author: "",
  genre:[],
  bookcover: undefined,
  quantity: "",
};

export function SampleForm({ onOpenChange }: BookFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [file,setFile]=useState<string>('')
  const [genre,setGenre]=useState([])
  useEffect(() => {
    const getCategories = async()=>{
      const res = await showCategories()
      setGenre(res)
    }
    getCategories()
  }, [])
  
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });
  const preset_key = "bookfarm";
  const cloud_name = "djl447xw2";

  async function onSubmit(values: z.infer<typeof accountFormSchema>) {
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("file", values.bookcover[0]);
    console.log(formdata.get("file"),"img");
    
    formdata.append("upload_preset", preset_key);
    const folderPath = "book-cover/";
    formdata.append("folder", folderPath);
    console.log(formdata);
    const getPhoto = async () => {
      const url = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/img/upload`,
        formdata
      );
      return url;
    };
    const coverbook = await getPhoto();
    const newObj = {
      bookname: values.title,
      bookauthor: values.author,
      bookgenre:values.genre,
      bookcover: coverbook.data.secure_url,
      bookquantity: values.quantity,
    };
    onOpenChange(false);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(newObj, null, 2)}</code>
        </pre>
      ),
    });
    setIsLoading(false);
    const response = await addBook(newObj);
    if(response.data){
      toast({
        variant: "destructive",
        title: response.data.message,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <div className="flex gap-10 items-center w-full">
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
                  {...form.register("bookcover",{onChange: (e) => {setFile(URL.createObjectURL(e.target.files[0]))},})}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
              {
                file && (
                  <FormDescription className="">
                    <img src={file} className="" alt="hi" width={100} height={125}/>
                  </FormDescription>
                )
              }
        </div>
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Quantity</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter book quantity"
                  type="number"
                  {...field}
                  className=""
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Uploading" : "Upload Book"}
        </Button>
      </form>
    </Form>
  );
}
