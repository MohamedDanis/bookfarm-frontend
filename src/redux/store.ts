import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice'
import cartSlice from './cartSlice'
import adminSlice from './adminSlice'

const store = configureStore({
    reducer:{
        auth:userSlice,
        carts:cartSlice,
        admin: adminSlice
    }
})

export default store