import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseApi } from "./base.api";

// add data category api
export const getAllCategorys = createAsyncThunk(
  "category/getAllCategorys",
  async () => {
    const respone = await baseApi.get("/category");
    return respone.data;
  }
);
