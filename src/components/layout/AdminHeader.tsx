import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { setAdmin } from "@/redux/adminSlice";
import { UserNav } from "./components";
import { useDispatch, useSelector } from 'react-redux';
import { adminDetails } from '@/api/admin/adminAuthRequest';
import { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logo from "@/assets/imgs/logo-bf.png";
type Props = {
  onMenuButtonClick(): void;
};

const AdminHeader = (props: Props) => {
  const isAuth = useSelector((state:any)=>state.admin.isAuthenticated)
  console.log(isAuth,99);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('admtoken');
    if (!isAuth && token) {
      console.log(2);
      
      const GetUser = async () => {
        console.log(isLoading);
        
        setIsLoading(true);
        const response = await adminDetails();
        console.log(response, 987656);
        const user = response;
        dispatch(setAdmin(user));
        setIsLoading(false);
      };
      GetUser();
    }
  }, [dispatch, isAuth])
  // useEffect(() => {
  //   // Use this effect to handle routing only on the client side
  //   LocalStorage.getItem('token').then((token) => {
  //     // console.log("token", token);
  //     if (!token) {
  //       router.push('/admin/auth/login/');
  //     }
  //   });
  // }, [router]);
  return (
    <header className="w-full h-auto mb-8 sticky dark:bg-[#020817]">
    <Container>
      <div className="flex justify-between px-4 items-center py-3">
      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <Bars3Icon className="h-6 w-6" />
      </button>
        <div className="relative">
          <img src={logo} alt="logo" width={100} height={50}/>
        </div>
        {/* <MainNav className="hidden md:flex"/> */}
       
       
        {
          isAuth ?(
            <div className="flex gap-4 items-center">
               {/* <ThemeToggle/> */}
               <UserNav/>
            </div>
          )  : (
            <nav className="flex gap-4 items-center">
            <Button asChild variant="ghost" className="">
              <Link to="/login" className=" px-4 py-1">
                Login
              </Link>
            </Button>
            <Button asChild variant="secondary" className="">
              <Link to="/register" className=" px-4 py-1">
                Signup
              </Link>
            </Button>
            
          </nav>
          )
        }
      </div>
    </Container>
  </header>
  )
}

export default AdminHeader