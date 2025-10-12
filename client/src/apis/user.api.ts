import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseApi } from "./base.api";
import type { UserForm } from "../interface/user.interface";

//get all users
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await baseApi.get("/users");
  return response.data;
});

//  add user
export const addUser = createAsyncThunk(
  "user/addUser",
  async (data: UserForm) => {
    const response = await baseApi.post("/users", data);
    return response.data;
  }
);

// delete user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id: string) => {
    await baseApi.delete(`/users/${id}`);
    return id;
  }
);
