import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        products:[],
        quantity: 0,
        total:0
        
    },
    reducers:{
        setItems:(state,action)=>{
            state.products = action.payload
            state.quantity = state.products.length
        },
        setTotalPrice:(state,action)=>{
            state.total = action.payload
        },
        removeFromCart:(state,action)=>{
            state.products = state.products.filter((item:any)=>item.id !== action.payload)
            state.quantity = state.products.length
        }
    }
})
export const {setItems,setTotalPrice} = cartSlice.actions
export default cartSlice.reducer