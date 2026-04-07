import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { adminService } from '@services/adminService'

const savedUser  = localStorage.getItem('admin_user')
const savedToken = localStorage.getItem('admin_token')

export const loginAsync = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const res = await adminService.login(credentials)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Erreur de connexion')
  }
})

export const logoutAsync = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await adminService.logout()
  } catch (_) { /* ignore */ }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:    savedUser  ? JSON.parse(savedUser)  : null,
    token:   savedToken || null,
    loading: false,
    error:   null,
  },
  reducers: {
    clearError: (state) => { state.error = null },
    setUser:    (state, action) => { state.user = action.payload },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => { state.loading = true; state.error = null })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false
        state.user    = action.payload.user
        state.token   = action.payload.token
        localStorage.setItem('admin_token', action.payload.token)
        localStorage.setItem('admin_user',  JSON.stringify(action.payload.user))
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false
        state.error   = action.payload
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user  = null
        state.token = null
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_user')
      })
  },
})

export const { clearError, setUser } = authSlice.actions
export default authSlice.reducer