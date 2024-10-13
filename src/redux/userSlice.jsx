// redux/userSlice.js

"use client"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks to fetch user data
export const fetchUserPlans = createAsyncThunk('user/fetchPlans', async (token) => {
    const response = await axios.get('https://api.varzik.ir/user/plans', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.plans;
});

export const fetchUserDiets = createAsyncThunk('user/fetchDiets', async (token) => {
    const response = await axios.get('https://api.varzik.ir/user/diets', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.diets;
});

export const fetchUserCoaches = createAsyncThunk('user/fetchCoaches', async (token) => {
    const response = await axios.get('https://api.varzik.ir/user/coaches', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.coaches;
});

export const updateWorkoutInfo = (updatedInfo) => (dispatch, getState) => {
  const state = getState();
  const updatedUser = {
      ...state.user.userInfo,
      workout_info: updatedInfo
  };
  dispatch(login(updatedUser));
};

const initialState = {
  userInfo: null,
  plans: [],
  diets: [],
  coaches: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      state.plans = [];
      state.diets = [];
      state.coaches = [];
      localStorage.removeItem('userInfo');
      localStorage.removeItem('jwtToken');
    },
    setUserFromStorage: (state) => {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        state.userInfo = JSON.parse(storedUserInfo);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Plans
      .addCase(fetchUserPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchUserPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to load plans';
      })

      // Diets
      .addCase(fetchUserDiets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDiets.fulfilled, (state, action) => {
        state.loading = false;
        state.diets = action.payload;
      })
      .addCase(fetchUserDiets.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to load diets';
      })

      // Coaches
      .addCase(fetchUserCoaches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCoaches.fulfilled, (state, action) => {
        state.loading = false;
        state.coaches = action.payload;
      })
      .addCase(fetchUserCoaches.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to load coaches';
      });
  },
});

export const { login, logout, setUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
