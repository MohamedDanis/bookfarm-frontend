import { useParams } from 'react-router-dom'
import React, { useEffect, useState,useCallback } from "react";
import useSWR, { mutate } from "swr";
import { addToCart, showBookDetails, showCart } from "@/api/admin/userRequests";
import Container from "@/components/ui/container";
import { CartCounter, StarRating } from "@/container/user";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import styles from './store.module.css'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import Breadcrumb from "@/components/general/BreadCrump";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "@/redux/cartSlice";
import { ReadMore } from "@/components/general";

const BookPage = () => {
    const params = useParams()
    console.log(params)
    const dispatch = useDispatch()
    const [cartclicked,setCartClicked] = useState(false)
    const id = params.id
    const [key, setKey] = useState(0);
    const cart = useSelector((state:any)=>state.carts.products)
    const fetcher = useCallback((id:any) => showBookDetails(id), []);
    const memoizedFetcher = useCallback(() => {
      return fetcher(id);
    }, [id, fetcher])
    const { data, error, isLoading } = useSWR(`/api/bookDetails`, memoizedFetcher
  );
  console.log(data);
  
  useEffect(() => {
    let itemIndex = cart.findIndex((item:any) => item?.productId?._id === data?._id);
    setKey(itemIndex)
    if(itemIndex > -1){
      setCartClicked(true)
    }
    mutate(`/api/bookDetails`) 
    return ()=>{
      setCartClicked(false)
    }
    
  }, [data])
  
    const handleCart =async () => {
      const res = await addToCart({
        data
      })
      console.log(res);
      const getCart =async () => {
        const res1 = await showCart()
        console.log(res1);
        dispatch(setItems(res1.products))
      }
      await getCart()
      if(res !== undefined){
        setCartClicked(true)
      }
      
    }
  return (
    <Container>
    <Breadcrumb terminalPath={data?.title}/>
    <div className="flex gap-20">
      {
        isLoading ? (
          <Skeleton className="w-[300px] h-[400px]"/>
        ):(
          <div className={styles.bookcontainer}>
            <div className={styles.book}>
             <img
          src={data?.coverimage}
          alt="bookcover"
          className=""
          width={300}
          height={800}
        />
          </div>
          </div>
          
         
        )
      }
     
      <section className="flex flex-col gap-y-6 w-2/3">
        <h2 className="text-lg font-medium">Rs. {data?.price}</h2>
        <h1 className="text-5xl font-bold">
          {data?.title}
        </h1>
        <StarRating rating={4} />
        <div>
        <h1>Description</h1>
        <ReadMore>
        {data?.description}
        </ReadMore>
      
        </div>
        <div className="flex gap-3">
          {
            cartclicked && (
              <CartCounter count={cart[key]?.quantity} productId={data?._id}/>
            )
          }
          <Button className="bg-[#547C5A] px-8 py-2" onClick={handleCart}>{cartclicked ? "ADDED":"ADD TO CART"}</Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className=" border-2 p-2 w-fit flex justify-center items-center rounded-xl">
                  <Bookmark />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-primary">
                <p className="text-white text-xs">Add to Wishlist</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </section>
    </div>
  </Container>
  )
}

export default BookPage