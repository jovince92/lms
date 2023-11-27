import React, { FC } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { MenuIcon } from 'lucide-react';
import CourseSideBar from './CourseSideBar';
import { Course } from '@/types';


interface Props{
    course:Course;
}

const CourseMobileSidebar:FC<Props> = ({course}) => {
    return (
        <Sheet>
            <SheetTrigger className='md:hidden pr-3.5 hover:opacity-75 transition duration-300'>
                <MenuIcon />
            </SheetTrigger>
            <SheetContent className='p-0 bg-background w-72' side='left'>
                <CourseSideBar course={course} />
            </SheetContent>
        </Sheet>
    )
}

export default CourseMobileSidebar