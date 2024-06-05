import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from '@/components/ui/checkbox'
import { useSelector } from 'react-redux'
import { Separator } from '@/components/ui/separator'
import { pgpayment } from '@/api/admin/userRequests'
const addressSchema = z.object({
    name:z.string().min(2).max(50),
    street1: z.string().min(2).max(100),
    street2: z.string().min(2).max(100),
    city: z.string().min(2).max(50),
    state: z.string().min(2).max(50),
    postalCode:  z.string().refine((val) => !Number.isNaN(parseInt(val, 10))),
    phone:  z.string().refine((val) => !Number.isNaN(parseInt(val, 10))),
    saveAddr:z.boolean().refine(
        checked => checked, 
        "You must accept terms"
      ).optional()
});

const AddressForm = () => {
    const form = useForm<z.infer<typeof addressSchema>>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
          name: "",
          street1:'',
          street2:'',
          city:'',
          state:'',
          postalCode:'',
          phone:'',
          saveAddr:undefined
        },
      })
      async function onSubmit(values: z.infer<typeof addressSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        const newObj = {...values,amount:totalAmount}
        const res = await pgpayment(newObj)
        if(res){
            window.location.href = res
        }
        
      }
      const cart = useSelector((state: any) => state.carts.products);
      const totalAmount = cart.reduce((total:any,item:any)=> total + item?.productId?.price*item?.quantity,0)
  console.log(totalAmount)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
        <div className='space-y-6 w-1/2'>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Fullname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input placeholder="street 1"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street2"
          render={({ field }) => (
            <FormItem className='space-y-7'>
              <FormControl className=''>
                <Input placeholder="street 2" className='space-y-1' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
                <FormLabel>City</FormLabel>
              <FormControl className=''>
                <Input placeholder="city / town" className='space-y-1' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
                <FormLabel>State</FormLabel>
              <FormControl className=''>
                <Input placeholder="state..." className='space-y-1' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
                <FormLabel>Pincode</FormLabel>
              <FormControl className=''>
                <Input placeholder="Enter your pincode" type='number' className='space-y-1' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
                <FormLabel>PhoneNumber</FormLabel>
              <FormControl className=''>
                <Input placeholder="Enter your phonenumber" type='number' className='space-y-1' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="saveAddr"
          render={({ field }) =>{
            console.log(field.value);
            
            return(
                <FormItem>
                    <FormLabel className='flex gap-2 items-center'>
                    <FormControl className=''>
                   <Checkbox checked={field.value} {...field} value={field.value ? "true" : "false"}/>
                </FormControl>
                        Save address for future
                    </FormLabel>
                <FormMessage />
                </FormItem>
              )
          } }
        />
        </div>
        <div>
            <h1 className='text-4xl font-semibold'>Your Order</h1>
            <div className='mt-5'>
            {
            cart.map((item:any,index:any)=>(
                <h2 key={index} className="flex gap-3 justify-between ">
                  <span className="text-left flex-1 text-slate-600">{item?.productId?.title}</span>
                  <span className="text-slate-600">x{item?.quantity}</span>
                  <span className="text-slate-800 font-medium">&#8377;{item?.productId?.price * item?.quantity}</span>
                </h2>
            ))
          }
            </div>
            <Separator className='my-4'/>
            <div className="my-5">
          <h1 className="flex justify-between">Sub Total <span className="text-xl font-semibold">&#8377;{totalAmount}</span></h1>
        </div>
        <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}

export default AddressForm