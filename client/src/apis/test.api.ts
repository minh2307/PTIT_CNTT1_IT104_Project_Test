import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseApi } from "./base.api";
import type { QuestionType, TestType } from "../interface/test.interface";

// get all test api
export const getAllTests = createAsyncThunk(
  "test/getAll",
  async (params: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
    search?: string;
  }) => {
    const { page, limit, sortBy, sortDir, search } = params || {};

    const query: Record<string, string | number> = {};

    if (page && limit) {
      query["_page"] = page;
      query["_limit"] = limit;
    }
    if (sortBy) {
      query["_sort"] = sortBy;
      query["_order"] = sortDir ?? "asc";
    }
    if (search) {
      query["q"] = search.trim();
    }

    const res = await baseApi.get("/tests", { params: query });
    const total = Number(res.headers["x-total-count"] || 0);
    return { data: res.data, total };
  }
);

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
    const response = await baseApi.patch(`/tests/${data.id}`, data);
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

// delete question test
export const deleteQuestionTest = createAsyncThunk(
  "test/deleteQuestionTest",
  async ({ id, questionId }: { id: number; questionId: number }) => {
    // Lấy test
    const { data: test } = await baseApi.get(`/tests/${id}`);

    // Xóa question và update
    await baseApi.patch(`/tests/${id}`, {
      questions: test.questions.filter(
        (q: QuestionType) => q.idQuestions !== questionId
      ),
    });

    return { id, questionId };
  }
);
