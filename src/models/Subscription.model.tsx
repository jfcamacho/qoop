export interface Subscription{
    id?: number;
    start_date?: Date;
    end_date?: Date;
    paid?: boolean;
    user_id?: number;
    user?: any;
}