import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axiosInstance';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export const fetchTasks = createAsyncThunk('tasks/fetch', async (_, thunkAPI) => {
  try {
    const { data } = await api.get('/tasks');
    return data;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const createTask = createAsyncThunk('tasks/create', async (payload, thunkAPI) => {
  try {
    const { data } = await api.post('/tasks', payload);
    return data;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateTask = createAsyncThunk('tasks/update', async ({ id, payload }, thunkAPI) => {
  try {
    const { data } = await api.put(`/tasks/${id}`, payload);
    return data;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
  try {
    await api.delete(`/tasks/${id}`);
    return id;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b
      .addCase(fetchTasks.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchTasks.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchTasks.rejected, (s, a) => { s.loading = false; s.error = a.payload || a.error.message; })

      .addCase(createTask.fulfilled, (s, a) => { s.items.unshift(a.payload); })
      .addCase(createTask.rejected, (s, a) => { s.error = a.payload || a.error.message; })

      .addCase(updateTask.fulfilled, (s, a) => {
        s.items = s.items.map(t => t._id === a.payload._id ? a.payload : t);
      })
      .addCase(deleteTask.fulfilled, (s, a) => {
        s.items = s.items.filter(t => t._id !== a.payload);
      });
  }
});

export default taskSlice.reducer;
