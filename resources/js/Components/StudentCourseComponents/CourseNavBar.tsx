import { Course } from '@/types'
import React, { FC } from 'react'
import NavBarRoutes from '../NavBarRoutes';
import CourseMobileSidebar from './CourseMobileSidebar';
import Logo from '../DashboardComponents/Logo';
import { Link } from '@inertiajs/inertia-react';

interface Props{
    course:Course;
}

const CourseNavBar:FC<Props> = ({course}) => {
    const {chapters} = course;
    return (
        <div className='p-3.5 border-b h-full flex items-center bg-background shadow-sm'>
            <div className='flex items-center md:gap-x-2'>
                <CourseMobileSidebar course={course} />
                
                    <div role='button' className='pl-12'><Logo /></div>
                
            </div>
            <NavBarRoutes />
        </div>
    )
}

export default CourseNavBar