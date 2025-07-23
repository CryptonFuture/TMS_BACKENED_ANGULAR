export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPass: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  active?: boolean;
  is_admin?: boolean;
  is_deleted?: boolean;
  created_by?: string | null;
  updated_by?: string | null;
}
