export interface IClient {
  name: string;
  email: string,
  password: string,
  confirmPass: string,
  phone: string,
  address: string,
  description: string,
  startTime: any,
  endTime: any,
  status: boolean
  is_deleted?: boolean;
  created_by?: string | null;
  updated_by?: string | null;
}
