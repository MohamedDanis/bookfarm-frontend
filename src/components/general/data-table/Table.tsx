"use client"
import { showUsers } from "@/api/admin/userRequests"
import { User, columns } from "./columns"
import { DataTable } from "@/components/ui/datatable"
import { useEffect, useState } from "react"

export default function Table() {
    const[userdata,setUserData]=useState<User[]>()
    useEffect(() => {
        const getUsers =async () => {
            try{
                const res=await showUsers()
                console.log(res,76)
                setUserData(res)
            }catch(error){
                console.log(error)
            }
        }
        getUsers()
        // if (!userdata) {
        //   getUsers();
        // }  `   
        // console.log(userdata,555)  
    }, [])
    
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={userdata || []} />
    </div>
  )
}
