import { Course } from '@/types'
import React, { FC } from 'react'
import CourseCard from './CourseCard';
import { cn } from '@/lib/utils';

interface Props {
    courses:Course[];
    className?:string;
}

const CoursesList:FC<Props> = ({courses,className}) => {
    return (
        <div className={cn('w-full',className)}>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5'>
                {
                    courses.map((course)=><CourseCard key={course.id}  course={course} />)
                }
            </div>
            {
                courses.length===0 && <div className='text-center text-sm md:text-lg text-muted-foreground mt-10 w-full'>No Courses Found</div>
            }
        </div>
  )
}

export default CoursesList