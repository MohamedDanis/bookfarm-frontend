"use client";
interface BookFormProps {
  onOpenChange: OnOpenChangeCallback;
}
type OnOpenChangeCallback = (newOpen: boolean) => void;
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { showCategories } from "@/api/admin/BookRequests";
import { adminCreateUser, createUser } from "@/api/admin/userRequests";
import { Icons } from "../general";


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

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  name: "",
  email: "",
  place:"",
  phonenumber: undefined,
};

export function UserForm({ onOpenChange }: BookFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [genre,setGenre]=useState([])
  useEffect(() => {
    const getCategories = async()=>{
      const res = await showCategories()
      setGenre(res)
      console.log(genre);
      
    }
    getCategories()
  }, [])
  
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof accountFormSchema>) {
    setIsLoading(true);
    console.log(values)
    onOpenChange(false);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    setIsLoading(false);
    const response = await adminCreateUser(values);
    console.log(response)
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (<Icons.Icons.spinner className="mr-2 w-4 h-4 animate-spin" />) : "Create"}
        </Button>
      </form>
    </Form>
  );
}
