export interface UserForm {
  id?: number;
  fullName?: string;
  email?: string;
  password?: string;
  role?: "user" | "admin";
}
