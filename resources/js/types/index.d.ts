

import ziggy from 'ziggy-js'

interface timestamps{
    
    created_at:string;
    updated_at:string;
}

export interface User extends timestamps{
    id: number;
    first_name:string;    
    last_name:string;
    company_id:string;
    photo?:string;
    level: 0|1|2;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    full_url:string;
    base_url:string;
};

declare global {
    var route: typeof ziggy;
}

