// redux/userSlice.js

"use client"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkTokenAndFetchUser = createAsyncThunk('user/checkToken', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    return rejectWithValue('No token found');
  }

  try {
    const response = await axios.get('https://api.varzik.ir/check-token', {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data.user; // Assuming the `user` object is part of the response
  } catch (error) {
    console.error('Error fetching user info:', error);
    return rejectWithValue('Failed to fetch user info');
  }
});

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

export const updateMedicalRecord = (medicalRecord) => (dispatch, getState) => {
  const state = getState();
  
  const updatedUser = {
    ...state.user.userInfo,
    medical_info: medicalRecord, // Store the medical record in the Redux store
  };

  // Dispatch updated user info
  dispatch(login(updatedUser));

  // Optionally store it in localStorage
  localStorage.setItem('userInfo', JSON.stringify(updatedUser));
};

export const updateWorkoutInfo = (updatedInfo) => (dispatch, getState) => {
  const state = getState();
  
  // Merge the updated info (which includes username and workout_info)
  const updatedUser = {
    ...state.user.userInfo,
    ...updatedInfo,  // This includes both username and workout_info
  };

  // Dispatch the updated user info to Redux
  dispatch(login(updatedUser));

  // Optionally update localStorage for redundancy
  localStorage.setItem('userInfo', JSON.stringify(updatedUser));
};

const initialState = {
  userInfo: null,
  medical_info: {},
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
      state.medical_info = {};
      localStorage.removeItem('userInfo');
      localStorage.removeItem('jwtToken');
    },
    setUserFromStorage: (state) => {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        state.userInfo = JSON.parse(storedUserInfo);
      }
    },
    updateMedicalRecord: (state, action) => {
      if (state.userInfo) {
        state.userInfo.medical_info = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user info from check-token API
      .addCase(checkTokenAndFetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkTokenAndFetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload; // Update the userInfo in Redux
        localStorage.setItem('userInfo', JSON.stringify(action.payload)); // Optional: update localStorage
      })
      .addCase(checkTokenAndFetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch user info';
      })
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
