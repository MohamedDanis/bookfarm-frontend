import {adminApi, userApi} from '../../utils/ApiCalls'
adminApi.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
      req.headers.Authorization = "Bearer " + localStorage.getItem("admtoken");
    }
    return req;
  })

export const showBooks = async()=>{ 
    const {data} = await adminApi.get('/books')
    return data
}

export const addBook =async (data:any) => {
    try {
        const res =  await adminApi.post('/books',{data})
        return res.data;
    } catch (error) {
        const response = (error as any).response;
        return response
    }
   
}

export const showBookDetails =async (id:string) => {
    console.log(id);
    
    const {data}= await adminApi.get(`/books/${id}`)
    return data;
}

export const showCategories =async () => {
    const {data}= await adminApi.get('/categories')
    return data;
}

export const editBook =async (id:any,data:any) => {
    try {
        const res = await adminApi.put(`/books/${id}`,{data})
        return res
    } catch (error) {
        const response= (error as any).response
        console.log(response);
        
        return response
    }
    
}

export const deleteBook =async (id:string) => {
    try {
        const data = await adminApi.delete(`/books/${id}`)
        return data
    } catch (error) {
        const response= (error as any).response
        return response
    }
    
}

export const searchBook =async (search:string) => {
    const {data}= await adminApi.get(`/search/books/?search=${search}`)
    return data;
}

export const borrowBookUser =async (data:any,id:any) => {
    try {
        const res = await adminApi.put(`/users/borrow/${id}`,{data})
        return res
    } catch (error) {
        const response= (error as any).response
        return response
    }
}


export const returnBookUser =async (borrowId:any,userId:any) => {
    console.log(borrowId,userId);
    try {
        const res = await adminApi.put(`/users/${userId}/return/${borrowId}`)
        console.log(res);
        
        return res
    } catch (error) {
        const response= (error as any).response
        return response
    }
}

export const createCategory =async (data:any) => {
    try {
        const res = await adminApi.post('/categories',{data})
        console.log(res);
        return res
    } catch (error) {
        const response= (error as any).response
        return response
    }
}

export const borrowers =async (bookId:any) => {
    try {
        const {data}= await adminApi.get(`/borrowers/${bookId}`)
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const borrowersHistory =async (bookId:any) => {
    try {
        const {data}= await adminApi.get(`/borrowers/history/${bookId}`)
        return data
    } catch (error) {
        console.log(error);
        
    }
}

export const latestBooks =async () => {
    try {
        const {data}= await userApi.get('/latest/books')
        console.log(data);
        
        return data
    } catch (error) {
        console.log(error);
    }
}

export const changeOrderStatus =async (id:any,data:any) => {
    try {
        const res = await adminApi.put(`books/orders/${id}/status`,{data})
        return res
    } catch (error) {
        const response= (error as any).response
        return response
    }
}
