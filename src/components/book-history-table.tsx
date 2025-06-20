import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import moment from "moment"
import { useEffect, useState } from "react"

export function BookHistoryTable({historyData}:any) {
  const [bookDetails, setBookDetails] = useState<any>([])
  useEffect(() => {
    if (historyData) {
      const updateBookDetails = async () => {
        const updatedBookDetails = await Promise.all(
          historyData.map(async (item: any) => {
            if (item.returnDate) {
              const transformedItem = {
                book: item?.book?.title,
                BorrowDate: moment(item.borrowDate).format("DD-MM-YYYY"),
                ReturnDate: moment(item.returnDate).format("DD-MM-YYYY"),
              };
              console.log(transformedItem);
              setBookDetails(transformedItem);
              return transformedItem;
            }
          })
        )
        setBookDetails(updatedBookDetails);
      }
      updateBookDetails();
    }
  }, [historyData])

  console.log(bookDetails,'fg');
  
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-medium">Books History</h3>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book Name</TableHead>
              <TableHead>Borrow Date</TableHead>
              <TableHead>Return Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookDetails.map((book:any) => (
              <TableRow key={book?.book}>
                <TableCell className="font-medium">{book?.book}</TableCell>
                <TableCell>{book?.BorrowDate}</TableCell>
                <TableCell>{book?.ReturnDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-500 dark:text-slate-400">Showing all borrowed books history</div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="w-4 h-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="w-4 h-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
