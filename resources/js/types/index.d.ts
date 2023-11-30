

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
    level: 0|1|2|3;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    full_url:string;
    base_url:string;
    categories:Category[];
    my_progress:Progress[];
    languages:Language[];
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
    icon_map_number:number;
    courses:Course[];
}

export interface Language  extends timestamps{
    id:number;
    name:string;
}

export interface Course extends timestamps{
    id:number;
    user_id:number;
    category_id:number;
    
    language_id?:number
    title:string;
    description?:string;
    image?:string;
    is_published:0|1;
    attachments:Attachment[];
    user:User;
    language?:Language;
    category:Category;
    chapters:Chapter[];
}

export interface Chapter extends timestamps{
    id:number;
    course_id:number;
    title:string;
    description?:string;
    video?:string;
    position:number;
    is_published:1|0;
    duration:string;
    course:Course;
}

export interface Progress extends timestamps{
    id:number;
    user_id:number;
    chapter_id:number;
    is_completed:0|1;
    user:User;
    chapter:Chapter;
}

export interface HrmsResponse{
    job_job_company : string;
    job_job_title : string;
    idno : string;
    last_name : string;
    first_name : string;
    middle_name : string;
    date_of_birth : string;
    age : string;
    picture_location : string;
    myaddress : string;
    contacts_home_telephone: string;
    contacts_mobile : string;
    work_email :string;
    other_email : string;
    jobcode : string;
    jobrole : string;
    department : string;
}

declare global {
    var route: typeof ziggy;
}



