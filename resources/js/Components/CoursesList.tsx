import { Course } from '@/types'
import React, { FC } from 'react'
import CourseCard from './CourseCard';
import { cn } from '@/lib/utils';

interface Props {
    courses:Course[];
    className?:string;
}

const CoursesList:FC<Props> = ({courses,className}) => {
    if(courses.length===0) return <div className='text-center text-sm md:text-lg text-muted-foreground mt-10 w-full'>No Courses Found</div>;
    return (
        <div className={cn('w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5',className)}>
            {
                courses.map((course)=><CourseCard key={course.id}  course={course} />)
            }
        </div>
    )
}

export default CoursesList