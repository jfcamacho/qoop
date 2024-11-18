export interface Task{
    title: string;
    description: string;
    project_id?: number;
    user_id?: number;
    user?: any;
    completed?: boolean;
}