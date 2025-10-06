export interface CategoryType {
  id?: number;
  categoryName?: string;
  categoryImg?: string;
}

export interface ModalState {
  isOpen?: boolean;
  mode?: "add" | "edit" | "delete" | null;
  editing?: CategoryType | null;
}

export interface InitialStateType extends ModalState {
  categorys?: CategoryType[];
  loading?: boolean;
  error?: string | null;
}
