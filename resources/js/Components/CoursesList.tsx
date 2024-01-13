import { Course, PageProps } from '@/types'
import React, { FC, useMemo } from 'react'
import CourseCard from './CourseCard';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/inertia-react';
import { Page } from '@inertiajs/inertia';

interface Props {
    courses:Course[];
    className?:string;
}

const CoursesList:FC<Props> = ({courses,className}) => {
    const {user} = usePage<Page<PageProps>>().props.auth;   
    if(courses.length===0) return <div className='text-center text-sm md:text-lg text-muted-foreground mt-10 w-full'>No Courses Found</div>;

    const filteredCourses = useMemo(()=>{
        return  courses.filter(course=>{
                        
            if(course.department_restrictions.length>0&&course.department_restrictions.findIndex(dept=>dept.department.trim()===user.department.trim()) <0) return false;
            if(course.position_restrictions.length>0&&course.position_restrictions.findIndex(position=>position.position.trim()===user.position.trim()) <0) return false;
            return true;
        });
    },[courses,user]);

    return (
        <div className={cn('w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5',className)}>
            {
                filteredCourses.map((course)=><CourseCard key={course.id}  course={course} />)
            }
        </div>
    )
}

export default CoursesList