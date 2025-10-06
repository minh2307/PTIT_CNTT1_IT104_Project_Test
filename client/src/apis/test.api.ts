import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseApi } from "./base.api";

// get all test api
export const getAllTests = createAsyncThunk("test/getAllTests", async () => {
  const respone = await baseApi.get("/tests");
  return respone.data;
});
