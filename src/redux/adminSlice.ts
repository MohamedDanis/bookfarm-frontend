import {createSlice} from '@reduxjs/toolkit'

const adminSlice = createSlice({
    name:'admin',
    initialState:{
        user:null,
        isAuthenticated:false,
        isAdmin:false
    },
    reducers:{
        setAdmin: (state, action) => {
            console.log(action.payload, 9999);
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isAdmin=true
          },
          resetAdmin: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isAdmin = false
          },
    }
})

export const {setAdmin,resetAdmin}=adminSlice.actions

export default adminSlice.reducer