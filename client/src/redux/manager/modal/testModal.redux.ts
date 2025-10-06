import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  InitialStateType,
  TestType,
} from "../../../interface/test.interface";
import { getAllTests } from "../../../apis/test.api";

const initialState: InitialStateType = {
  isOpen: false,
  mode: null,
  editing: null,
  tests: [],
  loading: false,
  error: null,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllTests.fulfilled,
        (state, action: PayloadAction<TestType[]>) => {
          state.loading = false;
          state.tests = action.payload;
        }
      )
      .addCase(getAllTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tests";
      });
  },
});

export const { openAdd, openEdit, openDelete, close } = testModalSlice.actions;
export default testModalSlice.reducer;
