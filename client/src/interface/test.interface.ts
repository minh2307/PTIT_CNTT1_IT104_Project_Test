export interface TestType {
  id?: number;
  testName?: string;
  categoryId?: string;
  question?: number;
  questions?: {
    content?: string;
    answers?: { answer?: string; isCorrected?: boolean }[];
  }[];
  playTime?: number;
  image?: string;
  playAmount?: number;
}

export type ModalState = {
  isOpen: boolean;
  mode: "add" | "edit" | "delete" | null;
  editing: TestType | null;
};

export interface InitialStateType extends ModalState {
  tests?: TestType[];
  loading?: boolean;
  error?: string | null;
  page?: number;
  total?: number;
}
