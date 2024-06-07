"use client"
import { getOrders } from "@/api/admin/adminAuthRequest"
import {  columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect } from "react"
import useSWR from "swr"


export default function Table() {
 const {data}=useSWR('/api/admin/orders',getOrders);
 console.log(data);
  useEffect(() => {
    }, [data]);
  
  
  return (
    <div className="container mx-auto py-8">
      <DataTable columns={columns} data={data|| []} />
    </div>
  );
}
