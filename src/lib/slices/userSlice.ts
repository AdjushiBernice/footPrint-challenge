import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { UserState, UserProfile } from "../types"

export const fetchUserProfile = createAsyncThunk("user/fetchProfile", async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    id: "1",
    name: "Charlene Reed",
    username: "Charlene Reed",
    email: "charlenereed@gmail.com",
    dateOfBirth: "25 January 1990",
    presentAddress: "San Jose, California, USA",
    permanentAddress: "San Jose, California, USA",
    city: "San Jose",
    postalCode: "45962",
    country: "USA",
  } as UserProfile
})

export const updateUserProfile = createAsyncThunk("user/updateProfile", async (profileData: Partial<UserProfile>) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return profileData
})

const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    updateProfileField: (state, action: PayloadAction<{ field: keyof UserProfile; value: string }>) => {
      if (state.profile) {
        ;(state.profile as any)[action.payload.field] = action.payload.value
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.profile = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch user profile"
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        if (state.profile) {
          state.profile = { ...state.profile, ...action.payload }
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to update user profile"
      })
  },
})

export const { clearError, updateProfileField } = userSlice.actions
export default userSlice.reducer
