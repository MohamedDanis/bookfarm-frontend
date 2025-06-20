import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

export function BorrowedBooksTable({borrowData}:any) {
  console.log(borrowData);
  
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Borrowed Books</h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
          <Input type="search" placeholder="Search books..." className="w-full md:w-[250px] pl-8" />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                </div>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="h-24">
              <TableCell colSpan={5} className="text-center text-slate-500 dark:text-slate-400">
                No results found.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-500 dark:text-slate-400">Showing 0 of 0 results</div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" disabled>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" disabled>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
