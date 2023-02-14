import { configureStore } from '@reduxjs/toolkit'
import productReducer from './features/products/productReducer'
import thunk from 'redux-thunk'
import cartReducer from './features/cart/cartReducer'
import loginReducer from './features/login/loginSlice'
import registerReducer from './features/register/registerSlice'
import profileReducer from './features/profile/profileSlice'
import orderReducer from './features/order/orderSlice'
import adminReducer from './features/admin/adminSlice'
export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: loginReducer,
    register: registerReducer,
    profile: profileReducer,
    order: orderReducer,
    admin: adminReducer,
  },
  middleware: [thunk],
})
