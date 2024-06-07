import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

export default function success() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-green-50 dark:bg-green-900">
      <div className="w-24 h-24 rounded-full flex items-center justify-center bg-green-200 dark:bg-green-800">
        <CheckIcon className="h-12 w-12 text-green-600 dark:text-green-300" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold text-green-600 dark:text-green-300">Payment Successful!</h2>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
        Thank you for your purchase. Your transaction has been completed successfully.
      </p>
      <div className="mt-6">
        <Link to="/">
          <Button
            className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white dark:border-green-300 dark:text-green-300 dark:hover:bg-green-300 dark:hover:text-gray-900"
            variant="outline"
          >
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

function CheckIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
