import Container from '@/components/ui/container'
import { AddressForm } from '@/container/user'
import React from 'react'
import { useSelector } from 'react-redux'

const CheckoutPage = () => {
    const cart = useSelector((state: any) => state.carts.products);
    console.log(cart);
    const totalAmount = cart.reduce((total:any,item:any)=> total + item?.productId?.price*item?.quantity,0)
  console.log(totalAmount)
  return (
    <div>
    <Container>
        <h1 className='text-4xl font-semibold my-4'>Billing Details</h1>
        <AddressForm/>
    </Container>
</div>
  )
}

export default CheckoutPage