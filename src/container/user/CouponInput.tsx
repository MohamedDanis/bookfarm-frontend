import { Input } from '@/components/ui/input'
import React from 'react'

const CouponInput = () => {
  return (
    <div className='relative'>
        <Input className='' placeholder='Enter coupon code'/>
        <button className='absolute right-4 top-2 text-[#0F452E] font-bold'>Apply</button>
    </div>
  )
}

export default CouponInput