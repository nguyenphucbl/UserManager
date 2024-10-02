import { createSlice } from "@reduxjs/toolkit";
import { addUser } from "../middlewares/userMiddleware";

const initialState = {
  user: {},
  status: "idle",
  error: null,
};

export const addUserSlice = createSlice({
  name: "addUser",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setUser, resetStatus } = addUserSlice.actions;
export default addUserSlice.reducer;
