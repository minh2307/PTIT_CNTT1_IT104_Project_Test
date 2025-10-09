import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  InitialStateType,
  TestType,
} from "../../../interface/test.interface";
import {
  getAllTests,
  addTest,
  editTest,
  deleteTest,
} from "../../../apis/test.api";

const initialState: InitialStateType = {
  isOpen: false,
  mode: null,
  editing: null,
  tests: [],
  loading: false,
  error: null,
  page: 1,
  total: 0,
};

const testModalSlice = createSlice({
  name: "categoryModal",
  initialState,
  reducers: {
    openAdd(state) {
      state.isOpen = true;
      state.mode = "add";
      state.editing = null;
    },
    openEdit(state, action: PayloadAction<TestType>) {
      state.isOpen = true;
      state.mode = "edit";
      state.editing = action.payload;
    },
    openDelete(state, action: PayloadAction<TestType>) {
      state.isOpen = true;
      state.mode = "delete";
      state.editing = action.payload;
    },
    close(state) {
      state.isOpen = false;
      state.mode = null;
      state.editing = null;
    },
    setPagination(state, action: PayloadAction<{ page: number }>) {
      state.page = action.payload.page;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllTests.fulfilled,
        (
          state,
          action: PayloadAction<{ data: TestType[]; total?: number }>
        ) => {
          state.loading = false;
          state.tests = action.payload.data;
          state.total = action.payload.total;
        }
      )
      .addCase(getAllTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tests";
      });
    // add test
    builder
      .addCase(addTest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTest.fulfilled, (state, action: PayloadAction<TestType>) => {
        state.loading = false;
        state.tests?.push(action.payload);
      })
      .addCase(addTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add test";
      })
      // edit test
      .addCase(editTest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTest.fulfilled, (state, action: PayloadAction<TestType>) => {
        state.loading = false;
        const index = state.tests?.findIndex((t) => t.id === action.payload.id);
        if (index !== undefined && index >= 0 && state.tests) {
          state.tests[index] = action.payload;
        }
      })
      .addCase(editTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to edit test";
      })
      // delete test
      .addCase(deleteTest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteTest.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          state.loading = false;
          state.tests = state.tests?.filter((t) => t.id !== action.payload.id);
        }
      )
      .addCase(deleteTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete test";
      });
  },
});

export const { openAdd, openEdit, openDelete, close, setPagination } =
  testModalSlice.actions;
export default testModalSlice.reducer;
