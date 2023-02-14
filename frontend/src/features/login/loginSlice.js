import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
const initialState = {
  isLoading: false,
  userInfo: userInfoFromStorage,
  error: '',
}
export const loginUser = createAsyncThunk('user/loginUser', async (info) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const { data } = await axios.post('/api/users/login', info, config)
  return data
})
const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state, thunkAPI) => {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('cartItems')
      localStorage.removeItem('shippingAddress')
      localStorage.removeItem('paymentMethod')
      state.userInfo = null
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true
    },
    [loginUser.fulfilled]: (state, action) => {
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
      state.userInfo = action.payload
      state.isLoading = false
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false
      state.error = 'Invalid credentials'
    },
  },
})

export const { logOut } = loginSlice.actions
export default loginSlice.reducer
