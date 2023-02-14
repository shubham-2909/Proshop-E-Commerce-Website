import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  isLoading: true,
  success: '',
  s2: false,
  error: '',
  order: null,
  e2: '',
  isL2: true,
  orderDetails: {},
  isL3: false,
  s3: false,
  isL4: false,
  s4: false,
  orders: [],
}

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (order, thunkAPI) => {
    const {
      user: { userInfo },
    } = thunkAPI.getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/orders', order, config)
    return data
  }
)

export const getOrderDetails = createAsyncThunk(
  'order/getOrderDetails',
  async (id, thunkAPI) => {
    const {
      user: { userInfo },
    } = thunkAPI.getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${id}`, config)
    return data
  }
)

export const payOrder = createAsyncThunk(
  'order/payOrder',
  async ({ id, paymentMethod }, thunkAPI) => {
    const {
      user: { userInfo },
    } = thunkAPI.getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/orders/${id}/pay`,
      paymentMethod,
      config
    )

    console.log(data)
    return data
  }
)

export const listMyOrders = createAsyncThunk(
  'orders/listMyOrders',
  async (x, thunkAPI) => {
    const {
      user: { userInfo },
    } = thunkAPI.getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/myorders`, config)

    return data
  }
)
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderReset: (state) => {
      state.orderDetails = {}
    },
  },
  extraReducers: {
    [createOrder.pending]: (state, action) => {
      state.isLoading = true
      state.error = ''
      state.success = ''
    },
    [createOrder.fulfilled]: (state, action) => {
      state.isLoading = false
      state.success = 'Order Created'
      state.order = action.payload
    },
    [createOrder.rejected]: (state, action) => {
      state.error = 'Something went wrong please try again'
      console.log(action)
      state.isLoading = false
    },
    [getOrderDetails.pending]: (state) => {
      state.isL2 = true
      state.e2 = ''
      state.s2 = ''
    },
    [getOrderDetails.fulfilled]: (state, action) => {
      state.isL2 = false
      state.s2 = true
      state.orderDetails = action.payload
      state.isLoading = true
      state.success = ''
      state.error = ''
    },
    [getOrderDetails.rejected]: (state) => {
      state.isL2 = false
      state.e2 = 'Order Not found'
      state.isLoading = true
      state.success = ''
      state.error = ''
    },
    [payOrder.pending]: (state) => {
      state.s3 = false
      state.isL3 = true
    },
    [payOrder.fulfilled]: (state) => {
      state.isL3 = false
      state.s3 = true
    },
    [payOrder.rejected]: (state) => {
      state.isL3 = false
      state.error = true
    },
    [listMyOrders.pending]: (state) => {
      state.isL4 = true
      state.s4 = false
    },
    [listMyOrders.fulfilled]: (state, action) => {
      state.isL4 = false
      state.orders = action.payload
      state.s4 = true
    },
    [listMyOrders.rejected]: (state) => {
      state.isL4 = false
      state.s4 = false
    },
  },
})

export const { orderReset } = orderSlice.actions
export default orderSlice.reducer
