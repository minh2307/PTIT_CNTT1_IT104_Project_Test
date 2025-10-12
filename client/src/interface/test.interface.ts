export interface AnswersType {
  answer?: string;
  isCorrected?: boolean;
}

export interface QuestionType {
  idQuestions?: number;
  content?: string;
  answers?: AnswersType[];
}

export interface TestType {
  id?: number;
  testName?: string;
  categoryId?: number;
  question?: number;
  questions?: QuestionType[];
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
