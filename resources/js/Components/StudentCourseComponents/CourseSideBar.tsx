import { Course } from '@/types';
import React, { FC } from 'react'
import CourseSidebarItem from './CourseSidebarItem';
import CourseProgressBar from '@/Pages/CourseProgressBar';


interface Props{
    course:Course;
}

const CourseSideBar:FC<Props> = ({course}) => {
    const {title,chapters} =  course;
    return (
        <div className='h-full border-r flex flex-col overflow-y-auto shadow-sm'>
            <div className='p-7 flex flex-col border-b'>
                <h1 className='font-semibold '>{title}</h1>
                <CourseProgressBar course={course} className='h-3.5' />
            </div>
            <div className='flex flex-col w-full'>
                {
                    chapters.map(chapter=><CourseSidebarItem key={chapter.id} chapter={chapter} />)
                }
            </div>
        </div>
    )
}

export default CourseSideBar