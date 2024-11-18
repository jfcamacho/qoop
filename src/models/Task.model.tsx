export interface Task{
    id?: number;
    title: string;
    description: string;
    project_id?: number;
    user_id?: number;
    user?: any;
    project?: any;
    completed?: number;
}