export interface ITaskAssign {
  user_id: string;
  project_id: string
  client_id: string
  plan_start_date: string;
  plan_end_date: string;
  task_id: string;
  plan_hour: number;
  working_hours: number;
  start_date: string;
  end_date: string;
  description: string;
  status?: boolean;
  is_deleted?: boolean;
  created_by?: string | null;
  updated_by?: string | null;
}
