import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function FailedPage() {
  return (
    <Card className="w-full max-w-lg mx-auto my-12 px-4 py-8 space-y-4 bg-red-100 dark:bg-red-700 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-red-500 dark:text-red-300">Payment Failed</h2>
      <p className="text-gray-700 dark:text-gray-300 text-center">
        Oops! Something went wrong with your payment. Please try again.
      </p>
      <Button
        className="w-full text-red-500 border-red-500 hover:bg-red-500 hover:text-white dark:text-red-300 dark:border-red-300 dark:hover:bg-red-300 dark:hover:text-gray-900"
        variant="outline"
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to Payment
      </Button>
    </Card>
  )
}

function ArrowLeftIcon(props:any) {
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}
