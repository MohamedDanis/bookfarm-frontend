import Container from "@/components/ui/container";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { BadgeIndianRupee, ChevronDown, Delete, MapIcon, Truck, XCircle } from "lucide-react";
import { CartCounter, CouponInput } from "@/container/user";
import { useDispatch, useSelector } from "react-redux";
import { Separator } from "@/components/ui/separator";
import { ReadMore } from "@/components/general";
import { setItems, setTotalPrice } from "@/redux/cartSlice";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const CartPage = () => {
    const cart = useSelector((state: any) => state.carts.products);
  const dispatch=useDispatch()
  const quantity = useSelector((state: any) => state.carts.quantity);
  const totalPrice = useSelector((state:any)=> state.carts.total)
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);
  useEffect(() => {
   
  }, [cart])
  const totalAmount = cart.reduce((total:any,item:any)=> total + item?.productId?.price*item?.quantity,0)
  console.log(totalAmount)
  dispatch(setTotalPrice(totalAmount))
  return (
    <Container className="flex gap-9">
      <div className="w-8/12">
        <div className="border border-[#d6bbaa] rounded px-5 py-2 w-full flex justify-between items-center">
          <h1 className="flex gap-2 items-center text-xl font-medium">
            My Cart{" "}
            <span className="bg-[#B7FF6C] text-base px-2 py-[2px] rounded-full flex justify-center items-center w-fit">
              {quantity}
            </span>
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <h2 className="flex items-center cursor-pointer font-normal">
                Filter <ChevronDown className="w-5 h-5"/>
              </h2>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                Status Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={setShowActivityBar}
                disabled
              >
                Activity Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel}
                onCheckedChange={setShowPanel}
              >
                Panel
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          {cart.map((item: any, index: any) => {
          console.log(item);
          
          return(
            <div key={index}>
            <Separator className="mb-6 mt-4 bg-[#634532]"/>
             <div className="items-top flex space-x-2" key={index}>
              <Checkbox id="terms1" className="w-5 h-5" />
              <div className="grid gap-1.5 leading-none">
                <h1 className="text-xl font-medium leading-4">{item?.productId?.title}</h1>
                <div className="w-full flex gap-x-4 mt-4">
                  <img
                    src={item?.productId?.coverimage}
                    alt="cover image"
                    width={100}
                    height={150}
                  />
                  <div className="">
                    <ReadMore>
                    {item?.productId?.description}
                    </ReadMore>
                    <div className="flex items-center justify-between mt-5">
                      <h1 className="text-2xl font-medium flex gap-2 items-center">&#8377; {item?.productId?.price*item?.quantity}</h1>
                      <div className="flex items-center gap-3">
                        <XCircle className="w-8 h-8 cursor-pointer"/>
                      <CartCounter count={item?.quantity} productId={item?.productId?._id} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          )})}
        </div>
      </div>
      <div className="w-4/12 border h-fit p-6">
        <h1 className="text-xl font-medium">Order Summary</h1>
        <div className="my-5">
          {
            cart.map((item:any,index:any)=>(
                <h2 key={index} className="flex gap-3 justify-between ">
                  <span className="text-slate-600">x{item?.quantity}</span>
                  <span className="text-left flex-1 text-slate-600">{item?.productId?.title}</span>
                  <span className="text-slate-800 font-medium">&#8377;{item?.productId?.price * item?.quantity}</span>
                </h2>
            ))
          }
        </div>
        <Separator/>
        <div className="my-5">
          <h1 className="text-xl font-medium">Delivery</h1>
          <div className="my-3">
            <h2 className="flex gap-4"><Truck className="text-slate-500"/> <span className="text-black font-semibold">IndiaPost Express</span> </h2>
            <h2 className="flex gap-4 text-slate-500"><MapIcon className="text-slate-500"/> Deliver to<span className="text-black font-semibold">Malappuram</span> </h2>
          </div>
        </div>
        <Separator/>
        <div className="my-5">
          <h1 className="flex justify-between">Order Total <span className="text-xl font-semibold">&#8377;{totalPrice}</span></h1>
        </div>
        <Separator/>
        <div className="flex flex-col gap-4 my-5">
          {/* <Input placeholder="Enter coupon code"/> */}
          <CouponInput/>
          <Link to='/checkout'>
          <Button className="w-full" variant="primary">Checkout</Button>
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default CartPage