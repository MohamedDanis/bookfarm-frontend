import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Overview,RecentSales } from "@/container/admin/DashboardPage";
import { useEffect, useState } from "react";
import { showSubscribedUsers, showUsers } from "@/api/admin/userRequests";
import { showBooks } from "@/api/admin/BookRequests";
import { BookCopy, UserCheck, Users } from "lucide-react";
// const Sidebar = dynamic(()=> import('../../../components/layout/Sidebar/Sidebar2'),{ssr:false})


export default function DashboardPage() {
  const [user,setUser]=useState()
  const [books,setBooks]=useState()
  const[borrower,setBorrower]=useState()
  useEffect(() => {
    const getData = async()=>{
      const user = await showUsers()
      const books = await showBooks()
      const subs = await showSubscribedUsers()
      setUser(user)
      setBooks(books)
      setBorrower(subs)
    }
    getData()
    
  }, [books,borrower])
  
  return (
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 p-8 pt-6 space-y-4">
          <div className="flex justify-between items-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="books" >
                Books
              </TabsTrigger>
              <TabsTrigger value="reports" >
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications">
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">
                      Total Books
                    </CardTitle>
                    <BookCopy />
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">{books ? (books as Array<any>).length : 0}</div>
                    {/* <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p> */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">
                     Total Users
                    </CardTitle>
                    <Users />
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">{user ? (user as Array<any>).length : 0}</div>
                    {/* <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p> */}
                  </CardContent>
                </Card>
                {/* <Card>
                  <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card> */}
                <Card>
                  <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">
                      Active Subscribers
                    </CardTitle>
                    <UserCheck />
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">{borrower ? (borrower as Array<any>).length : 0}</div>
                    {/* <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p> */}
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
                <Card className="md:col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>

                </Card>
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                      You made 265 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="books">

            </TabsContent>
          </Tabs>
        </div>
      </div>

    </>
  )
}