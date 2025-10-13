import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  CategoryType,
  InitialStateType,
} from "../../../interface/category.interface";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getAllCategorys,
} from "../../../apis/category.api";

const initialState: InitialStateType = {
  isOpen: false,
  mode: null,
  editing: null,
  categorys: [],
  loading: false,
  error: null,
  page: 1,
  total: 0,
};

const categoryModalSlice = createSlice({
  name: "categoryModal",
  initialState,
  reducers: {
    openAdd(state) {
      state.isOpen = true;
      state.mode = "add";
      state.editing = null;
    },
    openEdit(state, action: PayloadAction<CategoryType>) {
      state.isOpen = true;
      state.mode = "edit";
      state.editing = action.payload;
    },
    openDelete(state, action: PayloadAction<CategoryType>) {
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
      //get all category
      .addCase(getAllCategorys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllCategorys.fulfilled,
        (
          state,
          action: PayloadAction<{ data: CategoryType[]; total?: number }>
        ) => {
          state.loading = false;
          state.categorys = action.payload.data;
          state.total = action.payload.total;
        }
      )
      .addCase(getAllCategorys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch categories";
      })
      // add category
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<CategoryType>) => {
          state.loading = false;
          state.categorys?.unshift(action.payload);
        }
      )
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add category";
      })
      // edit category
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        editCategory.fulfilled,
        (state, action: PayloadAction<CategoryType>) => {
          state.loading = false;

          const index = state.categorys?.findIndex(
            (cat) => cat.id === action.payload.id
          );
          if (index !== undefined && index >= 0 && state.categorys) {
            state.categorys[index] = action.payload;
          }
        }
      )
      .addCase(editCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to edit category";
      })
      // delete category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          state.loading = false;
          state.categorys = state.categorys?.filter(
            (cat) => cat.id !== action.payload.id
          );
        }
      )
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete category";
      });
  },
});

export const { openAdd, openEdit, openDelete, close, setPagination } =
  categoryModalSlice.actions;
export default categoryModalSlice.reducer;
