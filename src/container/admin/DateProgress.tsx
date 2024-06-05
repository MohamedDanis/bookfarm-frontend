import { Progress } from "@/components/ui/progress"
import React from 'react'

const DateProgress = ({endDate}:any) => {
    function calculateProgressPercentage(remainingDays:any) {
        return ((30 - remainingDays) / 30) * 100;
      }
      console.log(endDate);
      
      console.log(calculateProgressPercentage(endDate))
  return (
    <Progress value={calculateProgressPercentage(endDate)} className="" />
  )
}

export default DateProgress