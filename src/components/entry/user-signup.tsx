import * as React from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/general/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Github,GoalIcon } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUser } from "@/api/admin/userRequests"
import { useToast } from "../ui/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
const signupFormSchema = z.object({
    name: z.string().min(1, { message: "Firstname is required" }),
    phonenumber: z.string().min(1, { message: "Lastname is required" }),
    place: z.string().min(1, { message: "Lastname is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });
  type SignupFormValues = z.infer<typeof signupFormSchema>;
  const defaultValues: Partial<SignupFormValues> = {
    name:"",
    email:"",
    phonenumber:"",
    place:"",
    password:"",
    confirmPassword:""
  };
export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { toast } = useToast();
  const navigate = useNavigate()
  const form = useForm<SignupFormValues>({
    defaultValues,
    resolver: zodResolver(signupFormSchema),
  })
  async function onSubmit(values:any) {
    console.log(values);
    
    try {
      setIsLoading(true)
      const res = await createUser(values)
      console.log(res,'response');
      if(false){
        toast({
          title: "Signup Error",
          variant: "destructive",
          description: res.data.message,
        });
      }else{
        toast({
          title: "Registration Successfull",
          variant: "success",
        });
        navigate('/login')
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error,'error')
      toast({
        title: "Signup Error",
        variant: "destructive",
        description: "Registration failed",
      });
      setIsLoading(false)
    }
   
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...form.register('email')}
            />
            {form.formState.errors.email && <span className="text-red-500 font-medium text-sm transition-all">{form.formState.errors.email.message}</span> }
          </div>
          <div className="grid gap-1">
            <Label className="" htmlFor="name">
              Name
            </Label>
            <Input
              id="email"
              placeholder="John Doe"
              type="text"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...form.register('name')}
            />
             {form.formState.errors.name && <span className="text-red-500 text-sm font-medium transition-all">{form.formState.errors.name.message}</span> }
          </div>
          <div className="grid gap-1">
            <Label className="" htmlFor="name">
              PhoneNumber
            </Label>
            <Input
              id="email"
              placeholder="91xxxxxxxx"
              type="text"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...form.register('phonenumber')}
            />
             {form.formState.errors.phonenumber && <span className="text-red-500 text-sm font-medium transition-all">{form.formState.errors.phonenumber.message}</span> }
          </div>
          <div className="grid gap-1">
            <Label className="" htmlFor="name">
              Place
            </Label>
            <Input
              id="email"
              placeholder="John Doe"
              type="text"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...form.register('place')}
            />
             {form.formState.errors.place && <span className="text-red-500 text-sm font-medium transition-all">{form.formState.errors.place.message}</span> }
          </div>
          <div className="grid gap-1">
            <Label className="" htmlFor="password">
              Password
            </Label>
            <Input
              id="email"
              placeholder="strong password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              {...form.register('password')}
            />
             {form.formState.errors.password && <span className="text-red-500 text-sm font-medium transition-all">{form.formState.errors.password.message}</span> }
          </div>
          <div className="grid gap-1">
            <Label className="" htmlFor="password">
              Confirm Password
            </Label>
            <Input
              id="email"
              placeholder="again the same password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              {...form.register('confirmPassword')}
            />
             {form.formState.errors.confirmPassword && <span className="text-red-500 text-sm font-medium transition-all">{form.formState.errors.confirmPassword.message}</span> }
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
         <GoalIcon/>
        )}{" "}
        Google
      </Button>
    </div>
  )
}