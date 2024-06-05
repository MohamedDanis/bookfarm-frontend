import React, { useEffect,useState } from "react";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const HistoryTable = ({booksHistory}:any) => {
   console.log(booksHistory);
   
    const [bookDetails,setBookDetails]=useState<any>([])
    useEffect(() => {
       if(booksHistory){
        const updateBookDetails = async()=>{
          const updatedBookDetails = await Promise.all(
            booksHistory.map(async (item:any)=>{
              if(item.returnDate){
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
    }, [booksHistory])
    console.log(bookDetails,'7676')
    
    
  return (
    <Table className="border my-4">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Book Name</TableHead>
          <TableHead>Borrow Date</TableHead>
          <TableHead>Return Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {
            bookDetails?.map((item:any)=>(
            <TableRow className="border">
          <TableCell className="font-medium">{item?.book}</TableCell>
          <TableCell>{item?.BorrowDate}</TableCell>
          <TableCell>{item?.ReturnDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HistoryTable;
