export interface Project{
    id?: number;
    title: string;
    description: string;
    tasks?: any;
    status?: number;    
    owner_id?: number;
}