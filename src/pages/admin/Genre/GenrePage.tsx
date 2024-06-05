import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Container from "@/components/ui/container";
import AuthLayout from "@/components/layout/AuthLayout";
import { toast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
const genreSchema = z.object({
  id: z.string().min(2),
  name: z.string().min(2).max(50),
});

import { SampleForm } from "@/components/entry";
import { Button } from "@/components/ui/button";
import { createCategory, showCategories } from "@/api/admin/BookRequests";

const GenrePage = () => {
  const [genre,setGenre]=useState([])

  const form = useForm<z.infer<typeof genreSchema>>({
    resolver: zodResolver(genreSchema),
    defaultValues: {
      id: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof genreSchema>) {
    console.log("first");

    const res = await createCategory(values);
    console.log(res, "hi");
    toast({
      title: "Category Successfull",
    });
  }

  useEffect(() => {
    const getCategories = async()=>{
      const res = await showCategories()
      setGenre(res)
    }
    getCategories()
  }, [])
  console.log(genre);
  
  return (
      <div className="">
        <Container className="p-6">
          <h1 className="text-3xl my-4 font-semibold">Add Category</h1>
          <div className="border p-4 bg-slate-50 rounded-2xl">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" flex gap-4 md:flex-row flex-col items-center"
              >
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem className="md:w-5/12 w-full">
                      <FormLabel>CategoryID</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} className="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="md:w-5/12 w-full ">
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" variant="primary" className="md:w-2/12 self-end">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
          <h1 className="text-3xl font-semibold my-6">Catgories List</h1>
          <div>
            {
              genre ? (
                <Table className="border">
                <TableCaption>A list of book categories</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Category ID</TableHead>
                    <TableHead className="border">Name</TableHead>
                    <TableHead className="border">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    genre.map((item:any,index)=>(
                      <TableRow key={index}>
                      <TableCell className="font-medium border">{item.CatId}</TableCell>
                      <TableCell className="border">{item.name}</TableCell>
                      <TableCell className="border">{item.status ? "Active" : "Inactive"}</TableCell>
                    </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
              ):(
                <Skeleton className="w-full h-[300px] rounded-2xl" />
              )
            }
          
          </div>
        </Container>
      </div>
  );
};

export default GenrePage;
