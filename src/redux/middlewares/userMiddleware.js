import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "../slices/addUserSlice";
const API = import.meta.env.VITE_API;
const fetchUserById = createAsyncThunk(
  "users/fetchUser",
  async (query = "") => {
    const res = await fetch(API + query);
    const totalCount = res.headers.get("X-Total-Count");
    const data = await res.json();
    return { data, totalCount };
  }
);
const addUser = createAsyncThunk(
  "users/addUser",
  async (user, { dispatch }) => {
    dispatch(setUser(user));
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      throw new Error("Failed to add user");
    }

    const data = await res.json();
    return data;
  }
);
const removeUser = createAsyncThunk("users/removeUser", async (userId) => {
  const res = await fetch(`${API}/${userId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete user");
  }
  return userId;
});

const editUser = createAsyncThunk("users/editUser", async (user) => {
  const res = await fetch(`${API}/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    throw new Error("Failed to edit user");
  }
  return user;
});

export { fetchUserById, addUser, removeUser, editUser };
