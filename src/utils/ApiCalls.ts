import axios from 'axios';

export const userApi = axios.create({
    baseURL: `https://bookfarm-server.onrender.com/api/users/`,
    withCredentials: true,
  });

 export const adminApi = axios.create({
  baseURL: `https://bookfarm-server.onrender.com/api/su/`,
  withCredentials: true,
});

console.log(import.meta.env.VITE_APP_BACKEND_URL);
