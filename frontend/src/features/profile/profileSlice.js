import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  success: '',
  isLoading: false,
  user: {},
  error: '',
}

export const getUserDetails = createAsyncThunk(
  'profile/getUserDetails',
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

    const { data } = await axios(`/api/users/${id}`, config)

    return data
  }
)

export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (user, thunkAPI) => {
    const {
      user: { userInfo },
    } = thunkAPI.getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put('/api/users/profile', user, config)
    return data
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    cleanupProfile: (state) => {
      state.success = false
      state.user = {}
      state.error = false
      state.isLoading = false
    },
  },
  extraReducers: {
    [getUserDetails.pending]: (state) => {
      state.isLoading = true
    },
    [getUserDetails.fulfilled]: (state, action) => {
      state.isLoading = false
      state.user = action.payload
    },
    [getUserDetails.rejected]: (state, action) => {
      state.isLoading = false
      console.log(action)
    },
    [updateUserProfile.pending]: (state) => {
      state.isLoading = true
    },
    [updateUserProfile.fulfilled]: (state, action) => {
      state.isLoading = false
      state.success = 'Profile Updated'
      const { _id, name, email, isAdmin } = action.payload
      state.user = { _id, name, email, isAdmin }
    },
    [updateUserProfile.rejected]: (state, action) => {
      state.isLoading = false
      state.error = 'User Not Found'
      state.success = ''
    },
  },
})
export const { cleanupProfile } = profileSlice.actions

export default profileSlice.reducer
