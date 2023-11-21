

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

export interface Attachment extends timestamps{
    id:number;
    course_id:number;
    course:Course;
    name:string;
    attachment:string;
}


export interface Category  extends timestamps{
    id:number;
    category:string;
    courses:Course[];
}

export interface Course extends timestamps{
    id:number;
    user_id:number;
    category_id:number;
    title:string;
    description?:string;
    image?:string;
    is_published:0|1;
    attachments:Attachment[];
    user:User;
    
    category:Category;
}

declare global {
    var route: typeof ziggy;
}

