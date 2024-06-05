/**
 * v0 by Vercel.
 * @see https://v0.dev/t/zZH5ZwBDDGv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"

export default function UnauthorizedPage() {
  return (
    <div className="h-[100dvh] w-full flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <LockIcon className="h-12 w-12" />
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Unauthorized Access</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">You do not have permission to access this page.</p>
          </div>
          <div className="space-y-2">
            <Button size="sm">Go Back</Button>
          </div>
        </div>
    </div>
  )
}

function LockIcon(props:any) {
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
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
