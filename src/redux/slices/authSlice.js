import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  const { data } = await axios.post('/auth/signin', params);
  return data;
});

export const fetchSignup = createAsyncThunk(
  'auth/fetchSignup',
  async (params) => {
    const { data } = await axios.post('/auth/signup', params);
    return data;
  }
);

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const { data } = await axios.get('/auth/user');
  return data;
});

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchSignup.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchSignup.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchSignup.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchUser.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchUser.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
