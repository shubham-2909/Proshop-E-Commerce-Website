import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const init = {
  address: '',
  city: '',
  postalCode: '',
  country: '',
}
const shippingAddressfromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : init

const paymentMethodfromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : ''
const initialState = {
  cartItems: cartItemsFromStorage,
  isLoading: true,
  shippingAddress: shippingAddressfromStorage,
  paymentMethod: paymentMethodfromStorage,
}

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async ({ id, qty }) => {
    try {
      const { data } = await axios(`/api/products/${id}`)
      return {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      }
    } catch (error) {
      console.log(error)
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeCartItem: (state, action) => {
      const id = action.payload
      state.cartItems = state.cartItems.filter((x) => x.product !== id)
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeAllCartItems: (state) => {
      state.cartItems = []
      state.shippingAddress = init
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      localStorage.setItem(
        'shippingAddress',
        JSON.stringify(state.shippingAddress)
      )
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
      localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod))
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false
      const item = action.payload
      const existItem = state.cartItems.find((x) => {
        return x.product === item.product
      })

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }
      state.isLoading = false
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    [getCartItems.rejected]: (state, action) => {
      console.log(action)
      state.isLoading = false
    },
  },
})

export const {
  removeCartItem,
  removeAllCartItems,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions

export default cartSlice.reducer
