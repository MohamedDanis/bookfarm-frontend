import {userApi,adminApi} from '../../utils/ApiCalls'

export const adminLogin = async(formData:any)=>{ 
    const {data} = await adminApi.post('/signin',formData)
    return data
}
export const userLogin = async(formData:any)=>{ 
    const {data} = await userApi.post('/signin',formData)
    return data
}

export const adminDetails = async()=>{ 
    const {data} = await adminApi.get('/profile')
    console.log(data,"good");
    
    return data
}
export const userDetails = async()=>{ 
    const {data} = await userApi.get('/profile')
    console.log(data,"good2");
    
    return data
}

export const changeSale = async(id:string)=>{
    const {data} = await adminApi.post(`/booksale/${id}`)
    return data

}

export const getOrders = async()=>{
    const {data} = await adminApi.get('books/orders')
    return data
}

adminApi.interceptors.request.use((req) => {
    if (localStorage.getItem("admtoken")) {
      req.headers.Authorization = "Bearer " + localStorage.getItem("admtoken");
    }
    return req;
  });
userApi.interceptors.request.use((req) => {
    if (localStorage.getItem("admtoken")) {
      req.headers.Authorization = "Bearer " + localStorage.getItem("admtoken");
    }
    return req;
  });

  
  // checking token is expired or not
//   adminApi.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response.status === 401) {
//         const { data } = error.response;
//         if (!data.error) {
//           localStorage.removeItem("adminToken");
//           window.location.href = "/admin/login";
//         }
//       }
//       return Promise.reject(error);
//     }
//   );