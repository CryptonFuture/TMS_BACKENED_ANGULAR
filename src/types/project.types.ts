export interface IProject {
  project_code: number;
  project_name: string,
  working_hours: number,
  joc: number,
  designName: string,
  project_manager_id: string,
  client_id: string,
  manager_id: string,
  start_date: Date,
  end_date: Date,
  allow_for_off_time: boolean,
  description: string,
  projectStatus: string,
  status: boolean
  is_deleted?: boolean;
  created_by?: string | null;
  updated_by?: string | null;
}
