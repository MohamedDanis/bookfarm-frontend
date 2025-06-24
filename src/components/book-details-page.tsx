"use client"

import { useEffect, useState } from "react"
import { Edit, Users, BookOpen, Calendar, Clock, MoreHorizontal, ArrowLeft, Download, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Link, useParams } from "react-router-dom"
import { borrowers, borrowersHistory,  showBookDetails } from "@/api/admin/BookRequests"
import moment from "moment"
type bookDetailsProps={
    _id:number,
    title:string,
    author:string,
    genre:string[],
    coverimage:string,
    availability:number,
}
export default function Component() {
   const[bookDetails,setBookDetails]=useState<bookDetailsProps | null>(null)
   const[bookHistory,setBookHistory]=useState<any>([])
    const [borrower,setBorrower]=useState<any>([])
      let {id}=useParams()
    useEffect(() => {
        const getBookDetails = async ()=>{
            const res=await showBookDetails(id)
            const res2 = await borrowers(res._id)
            setBookDetails(res)
            setBorrower(res2.users)
          }
          if(id===undefined){
            console.log('fetching data');

          }else{
            getBookDetails()
          }
        }, [id])

    useEffect(() => {
    const getHistory = async () => {
        const newarr: any = [];
      const res = await borrowersHistory(id);
      res.users.forEach((item: any) => {
        const filteredHistory = item.bookHistory.filter(
          (element: any) => element.book === id
        );

        filteredHistory.forEach((element: any) => {
          const newObj = {
            name: item.name,
            borrowDate: moment(element.borrowDate).format("DD-MM-YYYY"),
            returnDate: moment(element.returnDate).format("DD-MM-YYYY"),
          };

          newarr.push(newObj);
          setBookHistory(newarr)
        });
      });
      
    };
    getHistory()
  }, []);
  console.log(bookDetails,'bok');
  console.log(borrower);
  
  console.log(borrower[0].borrow.find((item:any)=>item.book==id));
  console.log(bookHistory);
  // const returnBook = async(id:string,userid:string)=>{
  //       console.log(userid);
  //       await returnBookUser(id,userid)
  //       toast({
  //         variant: "destructive",
  //         title: "Book Returned",
  //         description: `Book Returned successfully`,
  //       })
        
  //     }
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="text-blue-800 bg-blue-100">
            Active
          </Badge>
        )
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      case "returned":
        return (
          <Badge variant="secondary" className="text-green-800 bg-green-100">
            Returned
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button  variant="ghost" size="sm">
                <Link to="/admin/books" className="flex gap-2 items-center">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Books
                </Link>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="text-sm text-muted-foreground">Admin / Books / The Alchemist</div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 w-4 h-4" />
                Export
              </Button>
              <Button size="sm">
                <Edit className="mr-2 w-4 h-4" />
                Edit Book
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Book Details Section */}
        <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-3">
          {/* Book Cover and Basic Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative mx-auto mb-4 w-48 h-64">
                    <img
                     src={bookDetails?.coverimage}
                      alt="The Alchemist book cover"
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center mt-10">  
                    {
                      bookDetails?.genre?.map((item)=>(
                           <Badge className="mb-3 text-green-800 bg-green-100 hover:text-white">
                            {item}
                  </Badge>

                      ))
                    }
                  </div>
                  <h1 className="mb-2 text-2xl font-bold text-gray-900">{bookDetails?.title}</h1>
                  <p className="mb-4 text-lg text-gray-600">{bookDetails?.author}</p>
{/* 
                  <div className="p-4 mt-6 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-center">
                      <div className="flex justify-center items-center mb-2 space-x-2">
                        <BookOpen className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Available Copies</span>
                      </div>
                      <div className="text-3xl font-bold text-green-900">1</div>
                      <div className="mt-1 text-xs text-green-600">Currently on shelf</div>
                    </div>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <BookOpen className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Available Copies</p>
                      <p className="text-2xl font-bold text-gray-900">{bookDetails?.availability}</p>
                      {/* <p className="text-xs text-gray-500">Total known: {1 + 5} copies</p> */}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Borrowers</p>
                      <p className="text-2xl font-bold text-gray-900">{}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Overdue</p>
                      <p className="text-2xl font-bold text-gray-900">{}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            {/* Remove the entire "Quick Actions" section */}

            {/* Additional Book Information */}
            <Card>
              <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
                <CardTitle className="text-lg">Book Details</CardTitle>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 w-4 h-4" />
                  Edit Details
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">ISBN:</span>
                      <span className="text-sm text-gray-900">{'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Publication Year:</span>
                      <span className="text-sm text-gray-900">{'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Pages:</span>
                      <span className="text-sm text-gray-900">{'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Language:</span>
                      <span className="text-sm text-gray-900">English</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Publisher:</span>
                      <span className="text-sm text-gray-900">N/A</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Location:</span>
                      <span className="text-sm text-gray-900">N/A</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Added Date:</span>
                      <span className="text-sm text-gray-900">N/A</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Condition:</span>
                      <Badge variant="outline" className="text-green-700 bg-green-50 border-green-200">
                        Excellent
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Copy Tracking:</span>
                      <span className="text-sm text-gray-900">Available: {bookDetails?.availability}, Borrowed: {}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Active Borrowers Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 w-5 h-5" />
                Active Borrowers
              </CardTitle>
            </CardHeader>
            <CardContent>
              {borrower.length > 0 ? (
                <div className="space-y-4">
                  {borrower.map((borrow:any) => (
                    <div key={borrow.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>AR</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{borrow.name}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Mail className="mr-1 w-3 h-3" />
                              {borrow.email}
                            </div>
                            <div className="flex items-center">
                              <Phone className="mr-1 w-3 h-3" />
                              {borrow.phonenumber}
                            </div>
                          </div>
                          <div className="flex items-center mt-1 space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="mr-1 w-3 h-3" />
                              Borrowed: {new Date(borrow.borrowDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 w-3 h-3" />
                              Due: {new Date(borrow.dueDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(borrow.status)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {/* <DropdownMenuItem>Send Reminder</DropdownMenuItem> */}
                            {/* <DropdownMenuItem>Extend Due Date</DropdownMenuItem> */}
                            <DropdownMenuItem onClick={()=>{
                              const borrowItem = borrower.borrow.find((item:any)=>item.book==id)
                              console.log(borrowItem);
                              
                              // returnBook(borrowItem._id,)
                            }}>Mark as Returned</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <Users className="mx-auto mb-4 w-12 h-12 text-gray-300" />
                  <p>No active borrowers</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Borrowing History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 w-5 h-5" />
                Borrowing History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Borrower</TableHead>
                      <TableHead>Borrow Date</TableHead>
                      <TableHead>Return Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookHistory.map((record:any) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs">
                                {record.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{record.name}</p>
                              <p className="text-xs text-gray-500">{record.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{new Date(record.borrowDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-sm">{new Date(record.returnDate).toLocaleDateString()}</TableCell>
                        <TableCell>  <Badge variant="secondary" className="text-green-800 bg-green-100">
            Returned
          </Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
