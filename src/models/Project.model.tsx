export interface Project{
    id?: number;
    title: string;
    description: string;
    tasks?: number;
    status?: number;    
    owner_id?: number;
}