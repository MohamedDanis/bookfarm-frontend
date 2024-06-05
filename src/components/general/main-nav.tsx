import { cn } from "@/lib/utils"
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const links =[
  {
    name:'About',
    path:"/admin/dashboard"
  },
  {
    name:'Pricing',
    path:"/pricings"
  },
  {
    name:'Store',
    path:"/store"
  },
  {
    name:'Contact',
    path:"/admin/dashboard"
  },

]

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const location = useLocation()
  const isMenuItemActive = (href: string) => {
    return location.pathname === href;
  };

  
  return (
    <nav
      className={cn("items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {
        links.map((item,index)=>(
          <Link to={item.path} key={index}
          className={`text-sm font-medium transition-colors ${isMenuItemActive(item.path)?"bg-stone-700 text-white rounded-full px-4 py-2":""} `}
          >
            {item.name}
          </Link>
        ))
      }
     
    </nav>
  )
}
