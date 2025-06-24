"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { adminLogin } from "@/api/admin/adminAuthRequest"
import { toast } from "../ui/use-toast"

interface FormData {
  email: string
  password: string
  rememberMe: boolean
}

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

export function LoginForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Demo credentials

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (formData.email.length < 3) {
      newErrors.email = "Email must be at least 3 characters long"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear field-specific error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
        setIsLoading(true)
        if (!validateForm()) return

        setErrors({})
    
        const response = await adminLogin(formData);
         await  localStorage.setItem('admtoken', response.token);
    
          // Display a success message to the user
          toast({
            title: "Login Successful",
            variant: "success",
          });
    
        // Redirect to dashboard
        navigate("/admin/dashboard")
    } catch (error) {
        if (error instanceof Error && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
            console.log(error.response.data.message);
            setErrors({ general: error.response.data.message as string })
        }
        else{
            console.log(error);
        }
        setIsLoading(false)
    }
    

   
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>{errors.general}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="text"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.email ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter your email"
            disabled={isLoading}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </Label>
          <div className="relative mt-1">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`block w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                errors.password ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            <button
              type="button"
              className="flex absolute inset-y-0 right-0 items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
            className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
            disabled={isLoading}
          />
          <Label htmlFor="remember-me" className="block ml-2 text-sm text-gray-700">
            Remember me
          </Label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-green-600 hover:text-green-500">
            Forgot password?
          </a>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="flex justify-center px-4 py-2 w-full text-sm font-medium text-white bg-green-600 rounded-md border border-transparent shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-3 -ml-1 w-4 h-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  )
}
