import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:'user',
    initialState:{
        user:null,
        isAuthenticated:false,
    },
    reducers:{
          setUser: (state,action) =>{
            state.user = action.payload;
            state.isAuthenticated = true
          },
          resetUser:(state)=>{
            state.user=null;
            state.isAuthenticated=false
          }
    }
})



export const {setUser,resetUser}=userSlice.actions


export default userSlice.reducer