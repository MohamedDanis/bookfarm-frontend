"use client"
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAdmin } from '@/redux/userSlice';
import { adminDetails } from '@/api/admin/adminAuthRequest';
import { Rings } from 'react-loader-spinner';

const AuthLayout = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useNavigate();
  const isAuth = useSelector((state: any) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state: any) => state.auth.isAdmin); // Add isAdmin state
  useLayoutEffect(() => {
    try {
      const token = localStorage.getItem('admtoken');
     
    if (!isAuth && token) {
      if(!isAdmin){
         const GetUser = async () => {
        setIsLoading(true);
        const response = await adminDetails();
        console.log(response, 987656);
        const user = response;
        dispatch(setAdmin(user));
        setIsLoading(false);
      };
      GetUser();
      }else{
        router('/unauthorized')
      }
     
    }
    } catch (error) {
      console.log(error);
      
    }
    
  }, [dispatch, isAuth])
  
  useLayoutEffect(() => {
    // Use this effect to handle routing only on the client side
    const  token = localStorage.getItem('admtoken')
      if (!token) {
        router('/admin/login/');
      }
  }, [router]);

  if (isLoading) {
    return <div className='w-full h-screen grid place-items-center'><Rings
    height="100"
    width="100"
    color="#0F452E"
    radius="6"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel="rings-loading"
  /></div>;
  }

//   if (!isAdmin) { // Add check for isAdmin
//     router.push('/unauthorized')
// };

  return <>{children}</>;
};

export default AuthLayout;
