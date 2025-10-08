import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseApi } from "./base.api";
import type { TestType } from "../interface/test.interface";

// get all test api
export const getAllTests = createAsyncThunk("test/getAllTests", async () => {
  const respone = await baseApi.get("/tests");
  return respone.data;
});

// add test
export const addTest = createAsyncThunk(
  "test/addTest",
  async (data: TestType) => {
    const response = await baseApi.post("/tests", data);
    return response.data;
  }
);

// edit test
export const editTest = createAsyncThunk(
  "test/editTest",
  async (data: { id: number } & TestType) => {
    const response = await baseApi.put(`/tests/${data.id}`, data);
    return response.data;
  }
);

// delete test
export const deleteTest = createAsyncThunk(
  "test/deleteTest",
  async (id: number) => {
    await baseApi.delete(`/tests/${id}`);
    return { id };
  }
);
