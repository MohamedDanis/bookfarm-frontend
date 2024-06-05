import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EditForm } from '@/components/entry'
import { showBookDetails } from '@/api/admin/BookRequests'
import Container from '@/components/ui/container'
import Breadcrumb from '@/components/general/BreadCrump'
const BookEditPage = () => {
    const {id} = useParams()
    const [bookdetails,setBookDetails]=useState<any>()
    useEffect(() => {
      const getBookDetails = async ()=>{
        console.log(id,'hi');
          const res=await showBookDetails(id)
          setBookDetails(res)
        }
        if(id===undefined){
          console.log('fetching data')
        }else{
          getBookDetails()
        }
      }, [id])
  return (
    <div>
        {/* <h1 className='text-3xl font-semibold'>Basic Details</h1> */}
        {
          bookdetails && (<Container className='max-w-3xl px-4'>
            <Breadcrumb terminalPath={bookdetails?.title} />
            <EditForm bookdetails={bookdetails}/>
            </Container>)
        }
        
    </div>
 
  )
}

export default BookEditPage