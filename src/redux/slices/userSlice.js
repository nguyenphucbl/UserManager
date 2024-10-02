import { createSlice } from "@reduxjs/toolkit";
import {
  editUser,
  fetchUserById,
  removeUser,
} from "../middlewares/userMiddleware";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          }
          return user;
        });
      });
  },
});

export default userSlice.reducer;
