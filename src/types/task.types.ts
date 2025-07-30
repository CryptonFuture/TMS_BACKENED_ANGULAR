export interface ITask {
  name: string;
  description: string,
  client_id: string,
  status: boolean
  is_deleted?: boolean;
  created_by?: string | null;
  updated_by?: string | null;
}
