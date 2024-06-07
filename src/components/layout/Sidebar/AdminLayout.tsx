import  { useState,useEffect } from "react";
import Sidebar from "./Sidebar2";
import { Outlet} from "react-router-dom";
import AdminHeader from "../AdminHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminDetails } from "@/api/admin/adminAuthRequest";
import { setAdmin } from "@/redux/adminSlice";
const AdminLayout = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const isAdmin = useSelector((state:any)=> state.admin.isAdmin)
  useEffect(() => {
    const token = localStorage.getItem('admtoken');
    
    if (!isAdmin && token) {
      console.log(token);
      console.log(isLoading);
      
      const GetUser = async () => {
        setIsLoading(true);
        const response = await adminDetails();
        console.log(response, 987656);
        const user = response;
        dispatch(setAdmin(user));
        setIsLoading(false);
      };
      GetUser();
    }
  }, [dispatch, isAdmin])
  const router = useNavigate()
  useEffect(() => {
    // Use this effect to handle routing only on the client side
    const token=localStorage.getItem('admtoken')
    
      if (!token) {
        router('/admin/login');
      }
  }, [router]);
  console.log(isAdmin);
 return (

   <div className="grid grid-rows-header">
     <div className="bg-white shadow-sm z-10 h-[100px] sticky top-0">
       {/* <Navbar onMenuButtonClick={() => setShowSidebar((prev) => !prev)} /> */}
       <AdminHeader onMenuButtonClick={() => setShowSidebar((prev) => !prev)}/>
     </div>

     <div className="grid md:grid-cols-sidebar mt-8">
       <div className="">
           <Sidebar open={showSidebar} setOpen={setShowSidebar}/>
       </div>
 
       <Outlet/>
     </div>
   </div>

 )
    
    
 
};
export default AdminLayout;
