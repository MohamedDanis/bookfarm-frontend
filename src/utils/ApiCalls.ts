import axios from 'axios';

export const userApi = axios.create({
    baseURL: `http://localhost:5000/api/users/`,
    withCredentials: true,
  });

 export const adminApi = axios.create({
  baseURL: `http://localhost:5000/api/su/`,
  withCredentials: true,
});