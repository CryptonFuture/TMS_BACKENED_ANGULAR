export interface IRoles {
  name: string;
  description: string
  status: any
  is_deleted?: boolean;
  created_by?: string | null;
  updated_by?: string | null;
}
