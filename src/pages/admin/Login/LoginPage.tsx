
import logo from "@/assets/imgs/logo-bf.png";
import { LoginForm } from '@/components/entry/AdminLogin';





export default function LoginPage() {

  return (
    <div className="flex justify-center items-center px-4 py-12 min-h-screen bg-gray-50 sm:px-6 lg:px-8">
    <div className="space-y-8 w-full max-w-md">
      <div className="text-center">
        <div className="flex justify-center mb-6">
        <img src={logo} alt="logo" width={100} height={50}/>
        </div>
        <h2 className="mb-2 text-3xl font-bold text-gray-900">Admin Login</h2>
        <p className="text-gray-600">Sign in to access the admin dashboard</p>
      </div>

      <div className="px-6 py-8 bg-white rounded-lg border shadow-lg">
        <LoginForm />
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500">Secure admin access only</p>
      </div>
    </div>
  </div>
  )
}

