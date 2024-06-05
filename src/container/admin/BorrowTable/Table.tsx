"use client"
import { Borrow, columns } from "./columns"
import { DataTable } from "@/components/ui/datatable"
import { useEffect, useState } from "react"
import moment from "moment"

export default function Table({borrowData}:any) {
  const [userdata, setUserData] = useState<any>([]);

  useEffect(() => {
    if (borrowData) {
      const newData = borrowData.borrow.map((item:any) => ({
        id: item._id,
        userID: borrowData.id,
        name: item.book.title,
        author: item.book.author,
        Date: moment(item.borrowDate).format("DD-MM-YYYY")
      }));

      // Filter out duplicate objects based on the `id` property
      const filteredData = newData.filter((item:any, index:any, self:any) =>
        index === self.findIndex((t:any) => (
          t.id === item.id
        ))
      );

      setUserData(filteredData);
    }
  }, [borrowData]);

  console.log(userdata);
  
  return (
    <div className="container mx-auto py-8">
      <DataTable columns={columns} data={userdata || []} />
    </div>
  );
}
