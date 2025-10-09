import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseApi } from "./base.api";

// add data category api
export const getAllCategorys = createAsyncThunk(
  "category/getAll",
  async (params?: { page?: number; limit?: number }) => {
    const { page, limit } = params || {};

    const query: Record<string, number> = {};
    if (page && limit) {
      query["_page"] = page;
      query["_limit"] = limit;
    }

    const res = await baseApi.get("category", { params: query });
    const total = Number(res.headers["x-total-count"] || 0);

    return { data: res.data, total };
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (data: { categoryName: string; categoryImg: string }) => {
    const response = await baseApi.post("/category", data);
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id: number) => {
    await baseApi.delete(`/category/${id}`);
    return { id };
  }
);

export const editCategory = createAsyncThunk(
  "category/editCategory",
  async (data: { id: number; categoryName: string; categoryImg: string }) => {
    const response = await baseApi.put(`/category/${data.id}`, data);
    return response.data;
  }
);
