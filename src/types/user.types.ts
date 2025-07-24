export interface IUser {
  name: string;
  email: string;
  password: string;
  confirmPass: string;
  phone: string;
  address: string;
  designation: string;
  department: string;
  joiningDate: Date;
  description: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  active?: boolean;
  is_admin?: boolean;
  is_deleted?: boolean;
  created_by?: string | null;
  updated_by?: string | null;
}
