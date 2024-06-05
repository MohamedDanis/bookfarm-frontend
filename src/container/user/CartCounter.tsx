"use client"
import { decCart, incCart, showCart } from "@/api/admin/userRequests";
import { setItems } from "@/redux/cartSlice";
import { MinusIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import {useDispatch,useSelector} from 'react-redux'

interface CartCounterProps {
  count: number;
  productId:string;
}

const CartCounter = ({ count,productId }: CartCounterProps) => {
  const dispatch = useDispatch()
  const cart = useSelector((state:any)=>state.carts.total)
  console.log(cart);
  const [cartcount, setCartCount] = useState(count || 1);
  const handleCount = () => {
    if (cartcount > 0) {
      setCartCount(cartcount - 1);
    }
  };
  const handleIncrement = async()=>{
    const res = await incCart(productId)
    console.log(res,'cart sannam');
    
    const getCart =async () => {
      const res1 = await showCart()
      console.log(res1);
      dispatch(setItems(res1.products))
    }
    await getCart()
    
  }

  const handleDecrement = async()=>{
    const res = await decCart(productId)
    console.log(res);
    const getCart =async () => {
      const res1 = await showCart()
      console.log(res1);
      dispatch(setItems(res1.products))
    }
    await getCart()
    
  }

  return (
    <div className="border p-2 w-fit flex gap-6 items-center">
      <div
        className="w-8 h-8 bg-[#eee] flex justify-center items-center rounded cursor-pointer"
        onClick={handleCount}
      >
        <MinusIcon onClick={handleDecrement}/>
      </div>
      <div className="w-5 flex justify-center items-center">
        <p className="select-none">{cartcount}</p>
      </div>
      <div>
        <div
          className="w-8 h-8 bg-jade-600 flex justify-center items-center rounded cursor-pointer"
          onClick={() => setCartCount(cartcount + 1)}
        >
         <PlusIcon onClick={handleIncrement}/>
        </div>
      </div>
    </div>
  );
};

export default CartCounter;
