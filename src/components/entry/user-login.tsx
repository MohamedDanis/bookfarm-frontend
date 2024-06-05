"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/general/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github,GoalIcon } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { userLogin } from "@/api/admin/userRequests"
import { useNavigate } from "react-router-dom"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
const signinFormSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
  });
  type SigninFormValues = z.infer<typeof signinFormSchema>;
  const defaultValues: Partial<SigninFormValues> = {
    email:"",
    password:"",
  };
export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const navigate = useNavigate()
  const form = useForm<SigninFormValues>({
    defaultValues,
    resolver: zodResolver(signinFormSchema),
  })
  async function onSubmit(values:any) {
    try {
      setIsLoading(true)
      const res = await userLogin(values)
      localStorage.setItem('usrtoken', res.token);
     
      toast({
        title: "Login Successful",
        variant: "success",
      });
      setIsLoading(false)
      navigate('/')
    } catch (error:any) {
      console.log(error);
      
      // const message = error.response.data.message;
      toast({
        title: "Login Error",
        variant: "destructive",
        description: "login failed",
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
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
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