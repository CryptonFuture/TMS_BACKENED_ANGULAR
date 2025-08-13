export interface IPermission {
  name: string;
  route: string
  role: string
  action: any
  description: string
  status?: boolean;
  is_deleted?: boolean;
  created_by?: string | null;
  updated_by?: string | null;
}
