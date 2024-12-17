import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { borrowers, showBookDetails } from '@/api/admin/BookRequests';
import Container from '@/components/ui/container';
import Breadcrumb from '@/components/general/BreadCrump';
import { BookHistory, BorrowersCard } from '@/container/admin';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';
type bookDetailsProps={
    _id:number,
    title:string,
    author:string,
    genre:string,
    coverimage:string,
    availability:number,
}
const BookDetailsPage = () => {
    const[bookDetails,setBookDetails]=useState<bookDetailsProps | null>(null)
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
   console.log(bookDetails);
   
        
        
  return (
      <div className="">
        {bookDetails && borrower ? (
          <div>
            <Breadcrumb terminalPath={bookDetails?.title} />
            <Container className="p-6">
              <div className="mx-auto w-full max-w-4xl flex gap-16">
                <div className="relative">
                  <img
                    src={bookDetails?.coverimage}
                    alt="coverimage"
                    width={200}
                    height={400}
                    className="rounded-3xl aspect-[9 / 16] border-2"
                  />
                </div>
                <div className="flex flex-col gap-y-4 w-full">
                  <h2 className="bg-[#67C900]/50 px-5 py-2 rounded-full w-fit">
                    {bookDetails.genre}
                  </h2>
                  <h1 className="text-5xl font-bold">{bookDetails.title}</h1>
                  <h2 className="font-medium text-xl">{bookDetails.author}</h2>
                  <h2 className="text-lg font-medium flex items-center gap-4">
                    Copies :{" "}
                    <span className="text-xl w-fit font-bold flex justify-center items-center bg-green-300 py-1 px-2 rounded-3xl">
                      {bookDetails.availability}
                    </span>
                  </h2>
                  <Button className="self-end flex gap-2 w-fit">
                    <Link to={`/admin/books/edit/${bookDetails._id}`}>
                    <Edit2 className='w-4 h-4'/>Edit
                    </Link>
                     
                    </Button>
                </div>
              </div>
              <div className="flex gap-5 items-start my-6">
                <BorrowersCard data={borrower} />
                <div className="w-3/4 border rounded-2xl p-4">
                  <h1 className="text-2xl font-semibold ">Borrowers Hsitory</h1>
                  <BookHistory id={bookDetails._id} />
                </div>
              </div>
              <div>
                <h1 className='text-2xl font-semibold'>Add More Details</h1>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Pricing Details</AccordionTrigger>
                    <AccordionContent>
                      <Label>Price</Label>
                      <Input className='w-1/2'/>
                      <Button>Submit</Button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Container>
          </div>
        ) : (
          <Skeleton className="w-full m-6 h-[300px]" />
        )}
      </div>
  );
}

export default BookDetailsPage