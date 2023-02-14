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

export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (info) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post('/api/users', info, config)
    return data
  }
)
const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    cleanup: (state) => {
      state.userInfo = null
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true
    },
    [registerUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload
      state.isLoading = false
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false
      if (action.error.message === 'Request failed with status code 500') {
        console.log('here')
        state.error = 'Credentials Missing'
      } else {
        console.log('Over here')
        state.error = 'User already exists'
      }
    },
  },
})

export const { cleanup } = registerSlice.actions
export default registerSlice.reducer
