import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton";

export function BorrowersCard({data}:any) {
    console.log(data.length);
    
    
  return (
  <div className="w-1/4 border p-4 rounded-2xl ">
    <h1 className="text-2xl font-semibold my-2">Active Borrowers :</h1>
    {
        data.length===0 ? (
          <div>
            No data
            <Skeleton className="w-[100px] h-[40px]"/>
          </div>
        ) :data.map((item:any) => {
          const name = item.name;
          function getInitials(name: string): string {
            const names = name.split(" ");
            let initials = "";
            names.forEach((n) => {
              initials += n[0];
            });
            return initials.toUpperCase();
          }
          
          return (
            <div className="flex items-center justify-between space-x-4 w-auto border p-4 rounded-xl my-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.email}</p>
              </div>
            </div>
            
          </div>
           )})
    }
    
  </div>
  )
}