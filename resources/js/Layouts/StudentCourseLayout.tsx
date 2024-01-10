import Logo from '@/Components/DashboardComponents/Logo';
import MobileSidebar from '@/Components/DashboardComponents/MobileSidebar';
import Navbar from '@/Components/DashboardComponents/Navbar';
import NavBarRoutes from '@/Components/NavBarRoutes';
import CourseNavBar from '@/Components/StudentCourseComponents/CourseNavBar';
import CourseSideBar from '@/Components/StudentCourseComponents/CourseSideBar';
import { Course } from '@/types';
import React, { FC, ReactNode,  } from 'react'
import { cn } from '../lib/utils';


interface Props{
    children:ReactNode;
    course:Course;
    showSidebar?:boolean;
    className?:string;
}

const StudentCourseLayout:FC<Props> = ({children,course,showSidebar=true,className}) => {
    
    return (
        <div className='h-full'>
            <div className='h-[5rem] fixed inset-y-0 w-full z-50'>
                <CourseNavBar course={course} />
            </div>
            {
                showSidebar &&(
                <div className='h-full hidden  md:flex w-80 pt-[5rem] flex-col fixed inset-y-0 z-50 '>
                    <CourseSideBar course={course} />
                </div>)
            }
            <main className={cn('h-full md:pl-80 pt-[5rem]',!showSidebar&&'md:pl-0')}>
                {children}
            </main>
        </div>
    )
}

export default StudentCourseLayout