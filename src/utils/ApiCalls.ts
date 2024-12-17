import axios from 'axios';

export const userApi = axios.create({
    baseURL: `http://localhost:5001/api/users/`,
    withCredentials: true,
  });

 export const adminApi = axios.create({
  baseURL: `http://localhost:5001/api/su/`,
  withCredentials: true,
});

console.log(import.meta.env.VITE_APP_BACKEND_URL);
