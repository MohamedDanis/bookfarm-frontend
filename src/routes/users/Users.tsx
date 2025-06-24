import ClientLayout from "@/components/layout/ClientLayout";
import NotFoundPage from "@/pages/NotFoundPage";
import UnauthorizedPage from "@/pages/UnauthorizedPage";
import BookPage from "@/pages/client/Book/BookPage";
import CartPage from "@/pages/client/Cart/CartPage";
import CheckoutPage from "@/pages/client/Check/CheckoutPage";
import DashboardPage from "@/pages/client/Dashboard/DashboardPage";
import FailedPage from "@/pages/client/FailedPage";
import LandingPage from "@/pages/client/Landing/LandingPage";
import LoginPage from "@/pages/client/Login/LoginPage";
import PricingPage from "@/pages/client/Pricing/PricingPage";
import SignupPage from "@/pages/client/Signup/SignupPage";
import StorePage from "@/pages/client/Store/StorePage";
import SuccessPage from "@/pages/client/success/SuccessPage";
import { Route, Routes } from "react-router-dom";

const Users = () => {
  return (
    <div className="font-switzer">
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<LandingPage />} />
        <Route path='/pricings' element={<PricingPage/>}/>
        <Route path='/store' element={<StorePage/>}/>
        <Route path='/store/:id' element={<BookPage/>}/>                                
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route path='/success' element={<SuccessPage/>}/>
        <Route path='/user/dashboard' element={<DashboardPage/>}/>
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/failed" element={<FailedPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path='/unauthorized' element={<UnauthorizedPage/>}/>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </div>
  );
};

export default Users;
