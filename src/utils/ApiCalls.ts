import axios from 'axios';

export const userApi = axios.create({
    baseURL: `${import.meta.env.VITE_APP_BACKEND_URL}/api/users/`,
    withCredentials: true,
  });

 export const adminApi = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BACKEND_URL}/api/su/`,
  withCredentials: true,
  
});

