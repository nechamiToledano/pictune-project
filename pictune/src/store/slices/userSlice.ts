import api from "@/components/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserState {
  userName: string;
  email: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userName: "",
  email: "",
  loading: false,
  error: null,
};

// Fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/profile");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (profileData: { userName: string; email: string }, { rejectWithValue }) => {
    try {
      const response = await api.put("/auth/profile", profileData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Clear user profile data and localStorage
export const clearUser = () => {
  // Remove token or any other relevant data from localStorage
  localStorage.removeItem("token"); // Or use sessionStorage.removeItem("token") if needed
  
  return {
    type: 'user/clearUser',
  };
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Clear user state
    clearUserState: (state) => {
      state.userName = "";
      state.email = "";
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userName = action.payload.userName;
        state.email = action.payload.email;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userName = action.payload.userName;
        state.email = action.payload.email;
      })
      .addCase('user/clearUser', (state) => {
        // Reset the user data in the Redux state
        state.userName = "";
        state.email = "";
        state.loading = false;
        state.error = null;
      });
  },
});

export const { clearUserState } = userSlice.actions;

export default userSlice.reducer;
