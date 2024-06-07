"use client"
import React, { useRef } from "react";
import classNames from "classnames";
import {useLocation,Link} from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import { ClipboardList, Ticket } from "lucide-react";
// import { useParams,usePathname } from 'next/navigation'
import { BookOpenIcon, CalendarIcon, HomeIcon, UserGroupIcon,ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";



// define a NavItem prop
export type NavItem = {
  label: string;
  to: string;
  icon: React.ReactNode;
};
// add NavItem prop to component prop
type Props = {
  open: boolean;
  navItems?: NavItem[];
  setOpen(open: boolean): void;
};
const Sidebar = ({ open, setOpen }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, (e:any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  });
  // const params = useParams()
  const location = useLocation();
  const {  pathname } = location;
  console.log(pathname?.includes('dashboard'));
  
  return (
      <div
        className={classNames({
          "flex flex-col justify-between": true, // layout
          "bg-zinc-50 text-green-200 dark:bg-[#090f1f]": true, // colors
          "md:w-full md:sticky md:top-16 md:z-0 top-0 z-20 fixed": true, // positioning
          "md:h-[calc(100vh_-_64px)] h-full w-[200px]": true, // for height and width
          "transition-transform .3s ease-in-out md:-translate-x-0": true, //animations
          "-translate-x-full ": !open, //hide sidebar to the left when closed
        })}
        ref={ref}
      >

        <nav className="md:sticky top-0 md:top-24">
          {/* nav items */}
          <ul className="py-2 flex flex-col gap-2">
            {/* {navItems.map((item, index) => {
              console.log(item.label);
              console.log(pathname,item.label);
              
              return (
                <Link key={index} href={item.href}>
                  <li
                    className={classNames({
                      "text-green-900 hover:bg-green-900 hover:text-white": true, //colors
                      "flex gap-4 items-center ": true, //layout
                      "transition-colors duration-300": true, //animation
                      "rounded-md p-2 mx-2": true, //self style
                      "bg-green-900 text-white" : pathname.includes(item.label)
                    })}
                  >
                    {item.icon} {item.label}
                  </li>
                </Link>
              );
            })} */}
            <li>
              <Link to='/admin/dashboard' className={`text-green-900 hover:bg-green-900 hover:text-white ${pathname?.includes('dashboard') && 'bg-green-900 text-white'} transition-colors duration-300 rounded-md p-2 mx-2 flex gap-4 items-center`}>
              <HomeIcon className="w-6 h-6" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to='/admin/users' className={`text-green-900 hover:bg-green-900 hover:text-white ${pathname?.includes('users') && 'bg-green-900 text-white'} transition-colors duration-300 rounded-md p-2 mx-2 flex gap-4 items-center`}>
              <UserGroupIcon className="w-6 h-6" /> Users
              </Link>
            </li>
            <li>
              <Link to='/admin/books' className={`text-green-900 hover:bg-green-900 hover:text-white ${pathname?.includes('books') && 'bg-green-900 text-white'} transition-colors duration-300 rounded-md p-2 mx-2 flex gap-4 items-center`}>
              <BookOpenIcon className="w-6 h-6" /> Books
              </Link>
            </li>
            <li>
              <Link to='/admin/genre' className={`text-green-900 hover:bg-green-900 hover:text-white ${pathname?.includes('genre') && 'bg-green-900 text-white'} transition-colors duration-300 rounded-md p-2 mx-2 flex gap-4 items-center`}>
              <CalendarIcon className="w-6 h-6"/> Categories
              </Link>
            </li>
            <li>
              <Link to='/admin/requests' className={`text-green-900 hover:bg-green-900 hover:text-white ${pathname?.includes('requests') && 'bg-green-900 text-white'} transition-colors duration-300 rounded-md p-2 mx-2 flex gap-4 items-center`}>
              <ChatBubbleBottomCenterTextIcon className="w-6 h-6"/> Book Requests
              </Link>
            </li>
            <li>
              <Link to='/admin/requests' className={`text-green-900 hover:bg-green-900 hover:text-white ${pathname?.includes('events') && 'bg-green-900 text-white'} transition-colors duration-300 rounded-md p-2 mx-2 flex gap-4 items-center`}>
              <CalendarIcon className="w-6 h-6" /> Events
              </Link>
            </li>
          </ul>
          <h1 className="text-slate-800 font-medium text-xl mx-2 mb-2">Ecommerce</h1>
          <ul>
            <li>
              <Link to='/admin/orders' className={`text-green-900 hover:bg-green-900 hover:text-white ${pathname?.includes('orders') && 'bg-green-900 text-white'} transition-colors duration-300 rounded-md p-2 mx-2 flex gap-4 items-center`}>
               <ClipboardList/> Orders
              </Link>
            </li>
            <li>
              <Link to='/admin/coupons' className={`text-green-900 hover:bg-green-900 ${pathname?.includes('coupons') && 'bg-green-900 text-white'}  hover:text-white transition-colors duration-300 rounded-md p-2 mx-2 flex gap-4 items-center`}>
               <Ticket/> Coupons
              </Link>
            </li>
          </ul>
        </nav>
    
      </div>
  );
};
export default Sidebar;