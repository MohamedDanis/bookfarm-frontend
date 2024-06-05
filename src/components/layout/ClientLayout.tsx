import Container from "../ui/container";
import { Button } from "../ui/button";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import logo from "@/assets/imgs/logo-2.png";
import { MainNav } from "../general";
import { useEffect, useLayoutEffect, useState } from "react";
import { clientDetail, showCart } from "@/api/admin/userRequests";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { setItems } from "@/redux/cartSlice";
import { ShoppingBag } from "lucide-react";
import { UserAvatar } from "@/container/user";

const ClientLayout = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const isAuth = useSelector((state: any) => state.auth.isAuthenticated);
  const cart = useSelector((state: any) => state.carts.products);
  const quantity = useSelector((state: any) => state.carts.quantity);
  const dispatch = useDispatch();
    useEffect(() => {
      const token = localStorage.getItem("usrtoken");
      console.log(token)
      if (!isAuth && token) {
      const GetUser = async () => {
        setIsLoading(true);
        const response = await clientDetail();
        console.log(response, 987656);
        const user = response;
        dispatch(setUser(user));
        setIsLoading(false);
      }
      GetUser()
        if (cart.length === 0) {
          const getCart = async () => {
            const res = await showCart();
            dispatch(setItems(res.products));
          };
          getCart();
        }
      }
     
    }, [dispatch,isAuth,cart])
    console.log(isAuth);
    
  return (
        <>
        {params["*"] !== "login" && (
          <header className="w-full h-auto mb-8 sticky font-switzer">
            <Container>
              <div className="flex justify-between px-4 items-center py-3">
                {/* <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <Bars3Icon className="h-6 w-6" />
      </button> */}
                <div className="relative">
                  <Link to="/">
                    <img src={logo} alt="logo" width={100} height={50} />
                  </Link>
                </div>
                <MainNav className="hidden md:flex" />
                {isAuth ? (
            <div className="flex gap-4 items-center">
              <Link to="/cart" className="relative flex">
                <ShoppingBag />
                {quantity > 0 && (
                  <>
                    <span className="animate-ping absolute right-2 inline-flex h-3 w-3 rounded-full bg-[#7fa885] opacity-75"></span>
                    <span className="relative right-2 inline-flex rounded-full h-3 w-3 bg-[#547C5A]"></span>
                  </>
                )}
              </Link>
              <UserAvatar />
            </div>
          ) : (
            <nav className="flex gap-4 items-center">
              <Button asChild variant="ghost" className="">
                <Link to="/login" className=" px-4 py-1 ">
                  Login
                </Link>
              </Button>
              <Button asChild variant="secondary" className="">
                <Link to="/signup" className=" px-4 py-1">
                  Signup
                </Link>
              </Button>
            </nav>
          )}
                {/* <nav className="flex gap-4 items-center">
                  <Button asChild variant="ghost" className="">
                    <Link to="/login" className=" px-4 py-1 ">
                      Login
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" className="">
                    <Link to="/signup" className=" px-4 py-1">
                      Signup
                    </Link>
                  </Button>
                </nav> */}
              </div>
            </Container>
          </header>
          )}
          <Outlet />
        </>
  );
};

export default ClientLayout;
