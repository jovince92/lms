import CourseSideBar from '@/Components/StudentCourseComponents/CourseSideBar';
import { Course } from '@/types';
import React, { FC, ReactNode } from 'react'

interface Props{
    children:ReactNode;
    course:Course;
}

const StudentCourseLayout:FC<Props> = ({children,course}) => {
    return (
        <div className='h-full'>
            <div className='h-full hidden  md:flex w-80 flex-col fixed inset-y-0 z-50'>
                <CourseSideBar course={course} />
            </div>
            <main className='h-full md:pl-80'>
                {children}
            </main>
        </div>
    )
}

export default StudentCourseLayout