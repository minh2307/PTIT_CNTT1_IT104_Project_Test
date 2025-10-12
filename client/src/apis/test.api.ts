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
    const { data: test } = await baseApi.get(`/tests/${id}`);

    await baseApi.patch(`/tests/${id}`, {
      questions: test.questions.filter(
        (q: QuestionType) => q.idQuestions !== questionId
      ),
    });

    return { id, questionId };
  }
);

export const updateQuestionTest = createAsyncThunk(
  "test/updateQuestionTest",
  async ({ id, question }: { id: number; question: QuestionType }) => {
    const { data: test } = await baseApi.get<TestType>(`/tests/${id}`);

    const updatedQuestions = test.questions?.map((q) =>
      q.idQuestions === question.idQuestions ? question : q
    );

    await baseApi.patch(`/tests/${id}`, {
      questions: updatedQuestions,
    });

    return { id, question };
  }
);

export const addQuestionTest = createAsyncThunk(
  "test/addQuestionTest",
  async ({ id, newQuestion }: { id: number; newQuestion: QuestionType }) => {
    const { data: test } = await baseApi.get<TestType>(`/tests/${id}`);

    // Tạo mảng câu hỏi mới (nếu test chưa có câu hỏi thì để mảng rỗng)
    const updatedQuestions = [...(test.questions || []), newQuestion];

    await baseApi.patch(`/tests/${id}`, {
      questions: updatedQuestions,
    });

    return { id, newQuestion };
  }
);

// update số lượt chơi
export const updatePlayAmount = createAsyncThunk(
  "test/updatePlayAmount",
  async (id: number) => {
    const { data: test } = await baseApi.get(`/tests/${id}`);

    const updated = { ...test, playAmount: (test.playAmount ?? 0) + 1 };

    const { data } = await baseApi.patch(`/tests/${id}`, updated);

    return data as TestType;
  }
);
