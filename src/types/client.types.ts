export interface IClient {
  name: string;
  email: string,
  password: string,
  confirmPass: string,
  phone: string,
  address: string,
  description: string,
  start_time: any,
  end_time: any,
  status: boolean
  is_deleted?: boolean;
  created_by?: string | null;
  updated_by?: string | null;
}
