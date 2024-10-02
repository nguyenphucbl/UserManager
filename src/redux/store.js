import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import addUserReducer from "./slices/addUserSlice";
export const store = configureStore({
  reducer: {
    users: userReducer,
    addUser: addUserReducer,
  },
});
