import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, MapPin, Phone, UserCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"
import { userDetailsProps } from "@/utils/types";

const PersonalCard = ({userdata}:any) => {
    console.log(userdata);
    
  return (
      <Card className='md:w-1/3 w-full h-auto'>
        <CardHeader>
          <CardTitle>Personal Details:</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            {
                userdata ? (
                    <>
                     <div className="flex gap-2">
            <div className=""><UserCircle2 size={25}/> </div>
            <div className="flex flex-col">
                <h1 className="font-semibold">Name</h1>
                <h1 className="">{userdata?.name}</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <div className=""><Phone size={25}/> </div>
            <div className="flex flex-col">
                <h1 className="font-semibold">Mobile</h1>
                <h1 className="">{userdata?.phone}</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <div className=""><Mail size={25}/> </div>
            <div className="flex flex-col">
                <h1 className="font-semibold">Email</h1>
                <h1 className="">{userdata.email}</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <div className=""><MapPin size={25}/> </div>
            <div className="flex flex-col">
                <h1 className="font-semibold">Location</h1>
                <h1 className="">{userdata.place}</h1>
            </div>
          </div></>
                ):(
                    <Skeleton className="w-[100px] h-[20px] rounded-full" />
                )
            }
         
        </CardContent>
      </Card>
  );
};

export default PersonalCard;
