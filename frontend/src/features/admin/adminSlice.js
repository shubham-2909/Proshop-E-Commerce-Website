import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
  users: [],
  user: {},
  isLoading1: false,
  error1: '',
  isLoading2: false,
  success: false,
  error2: '',
  isLoading3: false,
  success3: false,
  error3: '',
  isLoading4: false,
  success4: false,
  error4: false,
}

export const getUsersList = createAsyncThunk(
  'Admin/getUserList',
  async (blank, thunkAPI) => {
    const {
      user: { userInfo },
    } = thunkAPI.getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios(`/api/users`, config)
    console.log(data)
    return data
  }
)

export const getUserAdmin = createAsyncThunk(
  'Admin/ getUserForAdmin',
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
export const deleteUser = createAsyncThunk(
  'Admin/deleteUser',
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

    const { data } = await axios.delete(`/api/users/${id}`, config)
    return data
  }
)

export const updateUser = createAsyncThunk(
  'Admin/UpdateUser',
  async (usertoUpdate, thunkAPI) => {
    console.log(usertoUpdate)
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
      `/api/users/${usertoUpdate._id}`,
      usertoUpdate,
      config
    )
    return data
  }
)
const adminSlice = createSlice({
  name: 'Admin',
  initialState,
  reducers: {
    cleanUsers: (state) => {
      state.users = []
    },
  },
  extraReducers: {
    [getUsersList.pending]: (state) => {
      state.isLoading1 = true
      state.isLoading3 = false
    },
    [getUsersList.fulfilled]: (state, action) => {
      state.isLoading1 = false
      state.users = action.payload
    },
    [getUsersList.rejected]: (state) => {
      state.isLoading1 = false
      state.error1 = 'Something went wrong please try again'
    },
    [deleteUser.pending]: (state) => {
      state.isLoading2 = true
    },
    [deleteUser.fulfilled]: (state) => {
      state.isLoading2 = false
      state.success = true
    },
    [deleteUser.rejected]: (state) => {
      state.isLoading2 = false
      state.error1 = 'User not Found'
    },
    [updateUser.pending]: (state) => {
      state.isLoading3 = false
    },
    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload
      state.isLoading3 = false
      state.success3 = true
    },
    [updateUser.rejected]: (state) => {
      state.error3 = 'Something Went Wrong Please try again'
      state.isLoading3 = false
      state.success3 = false
    },
    [getUserAdmin.pending]: (state) => {
      state.isLoading4 = true
      state.success4 = false
      state.isLoading3 = false
      state.success3 = false
      state.error4 = false
      state.error3 = false
    },
    [getUserAdmin.fulfilled]: (state, action) => {
      state.user = action.payload
      state.isLoading4 = false
      state.success4 = true
    },
    [getUserAdmin.rejected]: (state) => {
      state.isLoading4 = false
      state.error4 = true
    },
  },
})

export const { cleanUsers } = adminSlice.actions
export default adminSlice.reducer
