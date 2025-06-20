import { Progress } from "@/components/ui/progress"

const DateProgress = ({endDate}:any) => {
    function calculateProgressPercentage(remainingDays:any) {
        return ((30 - remainingDays) / 30) * 100;
      }
      console.log(endDate);
      
      console.log(calculateProgressPercentage(20))
  return (
    <Progress value={calculateProgressPercentage(endDate)} className="h-2" />
  )
}

export default DateProgress