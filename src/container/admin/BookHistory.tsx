import React, { useEffect } from "react";
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
import { borrowersHistory } from "@/api/admin/BookRequests";
import { Skeleton } from "@/components/ui/skeleton";

const BookHistory = ({ id }: any) => {
  console.log(id);

  const [bookDetails, setBookDetails] = React.useState<any>([]);
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
          setBookDetails(newarr)
        });
      });
      
    };
    getHistory()
  }, []);
  
  return (
    <div>
      {bookDetails?.length === 0 ? (
        // <Skeleton className="w-[100px] h-[500px] rounded-xl" />
        <div>
            No data
        </div>
      ) : (
        <Table className="border my-4">
          <TableCaption>A list of book holders history</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"> Name</TableHead>
              <TableHead>Borrow Date</TableHead>
              <TableHead>Return Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {bookDetails?.map((item: any) => (
              <TableRow className="border">
                <TableCell className="font-medium">{item?.name}</TableCell>
                <TableCell>{item?.borrowDate}</TableCell>
                <TableCell>{item?.returnDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
export default BookHistory;
