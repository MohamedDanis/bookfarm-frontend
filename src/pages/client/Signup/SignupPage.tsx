import { Link } from 'react-router-dom'
import logo from "@/assets/imgs/logo-bf.png";
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { SignupForm } from '@/components/entry/user-signup'

const SignupPage = () => {
  return (
    <>
    <div className="relative h-screen flex lg:px-0">
      <Link
        to="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full w-1/4 flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-no-repeat bg-center bg-[url('./assets/imgs/signup.png')]" />
        <div className="relative z-20 flex items-center text-lg font-medium">
        <div className="relative">
        <img src={logo} alt="logo" width={100} height={50}/>
      </div>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than
              ever before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 p-4 lg:w-3/4 flex">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <SignupForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              to="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  </>
  )
}

export default SignupPage