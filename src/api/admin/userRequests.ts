import {adminApi,userApi} from '../../utils/ApiCalls'
import useRazorpay from "react-razorpay";



adminApi.interceptors.request.use((req) => {
    if (localStorage.getItem("usrtoken")) {
      req.headers.Authorization = "Bearer " + localStorage.getItem("usrtoken");
    }
    return req;
  })
userApi.interceptors.request.use((req)=>{
    if (localStorage.getItem("usrtoken")) {
        req.headers.Authorization = "Bearer " + localStorage.getItem("usrtoken");
    }
    return req;
})

export const createAUser =async (data:any) => {
    try {
        const res = await adminApi.post('/users',{data})
        return res.data
    } catch (error) {
        console.log(error)
        const response = (error as any).response
        return response
    }
}

export const createUser =async (data:any) => {
    try {
        const res = await userApi.post('/signup',{data})
        return res.data
    } catch (error) {
        console.log(error)
        const response = (error as any).response
        return response
    }
}


export const showUsers = async ()=>{
    try {
        const {data} = await adminApi.get('/users')
        const newArray = data?.map((obj:any) => ({
            id:obj?._id,
            name: obj?.name,
            phonenumber: obj?.phonenumber,
            isSubscribed: obj?.isSubscribed,
            borrow: obj?.borrow?.length
        }));
        return newArray
    } catch (error) {
        const response = (error as any).response
        return response
    }
}

export const showSubscribedUsers = async ()=>{
    try{
        const {data} = await adminApi.get('/subscriptions')
        const newArray = data?.map((obj:any) => ({
            id:obj?._id,
            name: obj?.name,
            phonenumber: obj?.phonenumber,
            borrow: obj?.borrow?.length
        }));
        return newArray
    }catch(error){
        const response = (error as any).response
        return response
    }
}

export const deleteUser =async (id:any) => {
    try {
        const data = await adminApi.delete(`/users/${id}`)
        return data
    } catch (error) {
        const response= (error as any).response
        return response
    }
}

export const userDetails = async (id:any) => {
    try {
        const {data} = await adminApi.get(`/users/${id}`)
        console.log(data,'pai side');
        return data
    } catch (error) {
        const response = (error as any).response
        return response
    }
}


export const makeSubscription = async (id:any) => {
    try {
        const {data} = await adminApi.post(`/subcribes/${id}`)
        return data
    } catch (error) {
        const response = (error as any).response
        return response
    }
}

export const paymentOrder =async () => {
    try {
        const {data} = await adminApi.post(`/payment/orders`)
        return data
        
    } catch (error) {
        console.log(error);
        
    }
}
export const initPayment =async (data:any) => {
    const [Razorpay] = useRazorpay();
    const options = {
        key: "rzp_test_Zqoozg21eVRPdR",
        amount: data.amount,
        currency: data.currency,
        name: 'monthly subscription',
        description: "Test Transaction",
        order_id: data.id,
        handler: async (response:any) => {
            try {
                const { data } = await adminApi.post('/payment/verify', response);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        },
        theme: {
            color: "#3399cc",
        },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
}

export const userLogin =async (formData:any) => {
    const {data} = await userApi.post('/signin',formData)
    console.log(data);
    
    return data
}
export const clientDetail = async()=>{ 
    const {data} = await userApi.get('/profile')
    console.log(data,"good");
    
    return data
}

export const getAllBooks =async () => {
    const {data} = await userApi.get('/books')
    return data
}

export const showBookDetails =async (id:string) => {
    const {data}= await userApi.get(`/books/${id}`)
    return data;
}

export const showBorrowedBooks =async () => {
    const {data} = await userApi.get('/borrow')
    return data
}

// ECOMMERCE

export const addToCart =async (products:any) => {
    const {data} = await userApi.post('/cart',products)
    console.log(data);
    return data
}

export const showCart =async () => {
    const {data} = await userApi.get('/cart')
    return data
}

export const incCart =async (product:any) => {
    console.log(product);
    
    const {data} = await userApi.put('/cart/inc',{productId:product})
    console.log(data);
    
    return data
}

export const decCart =async (product:any) => {
    console.log(product);
    
    const {data} = await userApi.put('/cart/dec',{productId:product})
    return data
}


export const pgpayment =async (order:any) => {
    const {data} = await userApi.post('/pgpayment',{order})
    return data
}
