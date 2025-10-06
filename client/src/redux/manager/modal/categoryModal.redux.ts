import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  CategoryType,
  InitialStateType,
} from "../../../interface/category.interface";
import { getAllCategorys } from "../../../apis/category.api";

const initialState: InitialStateType = {
  isOpen: false,
  mode: null,
  editing: null,
  categorys: [],
  loading: false,
  error: null,
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
        (state, action: PayloadAction<CategoryType[]>) => {
          state.loading = false;
          state.categorys = action.payload;
        }
      )
      .addCase(getAllCategorys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch categories";
      });
  },
});

export const { openAdd, openEdit, openDelete, close } =
  categoryModalSlice.actions;
export default categoryModalSlice.reducer;
