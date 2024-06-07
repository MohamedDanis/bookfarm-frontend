import {
  CalendarIcon,
  HomeIcon,
  UserGroupIcon,
  BookOpenIcon
} from "@heroicons/react/24/outline";
import { NavItem } from "./Sidebar2";

export const defaultNavItems: NavItem[] = [
  {
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "Users",
    to: "/admin/users",
    icon: <UserGroupIcon className="w-6 h-6" />,
  },
  {
    label: "Books",
    to: "/admin/books",
    icon: <BookOpenIcon className="w-6 h-6" />,
  },
  {
    label: "Categories",
    to: "/admin/genre",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
  {
    label: "Book Requests",
    to: "/admin/requests",
    icon: <img src='/interview.png' alt="icon" width={24} height={24}/>,
  },
  {
    label: "Events",
    to: "/admin/requests",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
];
