"use client"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react"
import { showBooks } from "@/api/admin/BookRequests"

export default function Table() {
    const [bookdata, setBookData] = useState<Payment[]>([]);

  useEffect(() => {
    const getData = async () => {
        try {
          const response = await showBooks();
          setBookData(response);
          return response;
        } catch (error) {
          console.log(error);
        }
      };
        getData();
  }, []);


  
  return (
    <div className="container mx-auto py-8">
      <DataTable columns={columns} data={bookdata || []} />
    </div>
  );
}
