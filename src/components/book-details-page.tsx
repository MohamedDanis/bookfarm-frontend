import { ChevronRight, Edit, BookOpen, Users, Clock, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Link } from "react-router-dom"

export default function BookDetailedPage() {
  // const [activeTab, setActiveTab] = useState("borrowers")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-8 mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6 text-sm text-slate-500 dark:text-slate-400">
          <Link to="/admin" className="hover:text-slate-900 dark:hover:text-slate-50">
            <span className="sr-only">Home</span>
            <ArrowLeft className="mr-2 w-4 h-4" />
          </Link>
          <Link to="/admin" className="hover:text-slate-900 dark:hover:text-slate-50">
            Admin
          </Link>
          <ChevronRight className="mx-2 w-4 h-4" />
          <Link to={"/admin/books"} className="hover:text-slate-900 dark:hover:text-slate-50">
            Books
          </Link>
          <ChevronRight className="mx-2 w-4 h-4" />
          <span className="font-medium text-slate-950 dark:text-slate-50">The Alchemist</span>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Book Cover and Details */}
          <Card className="md:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-6 h-[300px] w-[220px] overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-reKMp1aMvxDHMnRJHmtZewIRFhJxg2.png"
                    alt="The Alchemist book cover"
                    className="object-cover"
                  />
                </div>
                <div className="flex justify-between items-center w-full">
                  <Badge className="text-emerald-800 bg-emerald-100 hover:bg-emerald-200">Thriller</Badge>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Edit className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Book Information and Borrowers */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <div className="space-y-1">
                <CardTitle className="text-3xl font-bold">The Alchemist</CardTitle>
                <p className="text-xl text-slate-500 dark:text-slate-400">Paulo Coelho</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex gap-4 items-center">
                  <div className="flex gap-2 items-center px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                    <BookOpen className="w-4 h-4 text-slate-900 dark:text-slate-50" />
                    <span className="text-sm font-medium">
                      Copies: <span className="text-slate-900 dark:text-slate-50">6</span>
                    </span>
                  </div>
                </div>

                <Tabs defaultValue="borrowers" className="mt-6">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="borrowers">
                      <Users className="mr-2 w-4 h-4" />
                      Active Borrowers
                    </TabsTrigger>
                    <TabsTrigger value="history">
                      <Clock className="mr-2 w-4 h-4" />
                      Borrowing History
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="borrowers" className="mt-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex gap-4 items-center p-2">
                          <Avatar className="w-10 h-10 border">
                            <AvatarFallback className="bg-slate-900/10 text-slate-900 dark:bg-slate-50/10 dark:text-slate-50">AR</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Arzak Rahman</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">arzak@gmail.com</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="history" className="mt-4">
                    <Card>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Borrow Date</TableHead>
                              <TableHead>Return Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Arzak Rahman</TableCell>
                              <TableCell>01-11-2023</TableCell>
                              <TableCell>01-11-2023</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Arzak Rahman</TableCell>
                              <TableCell>01-11-2023</TableCell>
                              <TableCell>25-03-2024</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
