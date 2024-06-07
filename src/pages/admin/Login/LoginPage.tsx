import { adminLogin } from '@/api/admin/adminAuthRequest';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"


interface FormData {
  email: string;
  password: string;
}




/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XLk5XkfDsKj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

export default function LoginPage() {
  const { toast } = useToast();
  const router = useNavigate();
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await adminLogin(formData);
      localStorage.setItem('admtoken', response.token);

      // Display a success message to the user
      toast({
        title: "Login Successful",
        variant: "success",
      });

      // Redirect to the dashboard
      router("/admin/dashboard");
    } catch (error:any) {
      // Handle login errors here
      console.error("Login error:", error);
      
      // const message = error;
      // console.log(message.response);
      
      // Display an error message to the user
      toast({
        title: "Login Error",
        variant: "destructive",
        description: error?.response,
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      <div className="max-w-md w-full overflow-hidden">
        <div className="bg-white p-8 rounded-lg shadow-lg relative">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back 👋</h2>
            <p className="text-sm text-gray-600">Enter your credentials to access your account.</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="sr-only" htmlFor="email">
                Email Address / Phone Number
              </label>
              <Input id="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
              placeholder="Email Address / Phone Number" type="email" />
            </div>
            <div>
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <Input id="password"
               type="password"
               name="password"
               value={formData.password}
               onChange={handleChange}
              placeholder="Password" />
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox id="remember" />
              <label className="text-sm text-gray-600" htmlFor="remember">
                Remember me
              </label>
            </div>
            <Button className="w-full">Sign In</Button>
          </form>
       
        </div>
        <div className="absolute top-0 right-0 h-64 w-64 bg-blue-600 rounded-full -mt-32 -mr-20" />
        <div className="absolute bottom-0 left-0 h-24 w-24 bg-blue-600 rounded-full mb-10 ml-10" />
        <div className="absolute bottom-0 left-0 h-12 w-12 bg-green-600 rounded-full mb-32 ml-32" />
      </div>
    </div>
  )
}

