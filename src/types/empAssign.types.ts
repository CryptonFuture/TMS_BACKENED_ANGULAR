export interface IEmpAssign {
  user_id: string;
  project_id: string
  plan_start_date: string;
  plan_end_date: string;
  task_id: string;
  plan_hour: number;
  working_hours: number;
  start_date: string;
  end_date: string;
  description: string;
  status?: boolean;
  total_days: string
  daily_working_hours: string
  total_working_hours: string
  is_deleted?: boolean;
  created_by?: string | null;
  updated_by?: string | null;
}
