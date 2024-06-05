"use client"
interface BookFormProps {
  onOpenChange: OnOpenChangeCallback;
}
type OnOpenChangeCallback = (newOpen: boolean) => void;
import { FieldValues, useForm } from "react-hook-form"
import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
const MAX_FILE_SIZE = 500000;
const ACCEPTED_img_TYPES = ["img/jpeg", "img/jpg", "img/png", "img/webp"];
const bookSchema=z.object({
  title:z.string().min(5,"bookname should be atleast 5 characters"),
  author:z.string().min(5,"author name should be atleast 5 characters"),
  bookcover: z
  .any()
  .refine((files) => files?.length == 1, "img is required.")
  .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (files) => ACCEPTED_img_TYPES.includes(files?.[0]?.type),
    ".jpg, .jpeg, .png and .webp files are accepted."
  ),
  quantity:z.string().refine((val) => !Number.isNaN(parseInt(val, 10)))
})

type TBookSchema=z.infer<typeof bookSchema>

export function BookForm({onOpenChange}:BookFormProps) {
 
const {register,handleSubmit,formState:{errors,isSubmitting},reset}=useForm<TBookSchema>({
  resolver:zodResolver(bookSchema)
})

const onSubmit = async (data:TBookSchema) => {
  console.log(data.bookcover)
  reset()
}
  return (
    <>
    <form action="" onSubmit={handleSubmit(onSubmit)}>
    <Input {
      ...register("title")
    }
     type="name" placeholder="Bookname" />
     {errors.title && <span className="text-red-500 transition-colors">bookname field is required</span>}
    <Input  {
      ...register("author")
    }
     type="name" placeholder="Author name" />
     {errors.author && <span className="text-red-500 transition-colors">author field is required</span>}
    <Input  {
      ...register("bookcover")
    }
     type="file" placeholder="Book Cover" />
    {errors.bookcover && <span className="text-red-500 transition-colors">field required</span>}
    <Input  {
      ...register("quantity")
    }
     type="number" placeholder="Book Quantity" />
     {errors.quantity && <span className="text-red-500 transition-colors">{errors.quantity.message}</span>}
    <Button variant="secondary">Submit</Button>
    </form>
    </>
  )
}