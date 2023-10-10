import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // 'not-authenticated', 'authenticated'
    user: {},
    errorMessage: undefined
  },
  reducers: {
    checking: state => {
      state.status = 'checking'
      state.user = {}
      state.errorMessage = undefined
    }
  }
})
