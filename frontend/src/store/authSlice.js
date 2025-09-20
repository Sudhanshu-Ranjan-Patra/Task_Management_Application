import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axiosInstance';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null
};

export const registerUser = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
  try {
    const { data } = await api.post('/auth/register', payload);
    return data;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const loginUser = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
  try {
    const { data } = await api.post('/auth/login', payload);
    return data;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(registerUser.fulfilled, (s, a) => {
        s.loading = false; s.user = a.payload.user; s.token = a.payload.token;
        localStorage.setItem('token', a.payload.token);
        localStorage.setItem('user', JSON.stringify(a.payload.user));
      })
      .addCase(registerUser.rejected, (s, a) => { s.loading = false; s.error = a.payload || a.error.message; })

      .addCase(loginUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false; s.user = a.payload.user; s.token = a.payload.token;
        localStorage.setItem('token', a.payload.token);
        localStorage.setItem('user', JSON.stringify(a.payload.user));
      })
      .addCase(loginUser.rejected, (s, a) => { s.loading = false; s.error = a.payload || a.error.message; });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
