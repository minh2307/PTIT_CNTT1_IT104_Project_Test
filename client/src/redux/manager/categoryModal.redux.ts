import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CategoryType } from "../../interface/category.interface";

type ModalState = {
  isOpen: boolean;
  mode: "add" | "edit" | "delete" | null;
  editing: CategoryType | null;
};

const initialState: ModalState = {
  isOpen: false,
  mode: null,
  editing: null,
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
});

export const { openAdd, openEdit, openDelete, close } =
  categoryModalSlice.actions;
export default categoryModalSlice.reducer;
