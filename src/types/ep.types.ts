export interface IEp {
  name: string;
  epName: string,
  status: boolean
  is_deleted?: boolean;
  created_by?: string | null;
  updated_by?: string | null;
}
