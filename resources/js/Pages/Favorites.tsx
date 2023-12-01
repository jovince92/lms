import CoursesList from '@/Components/CoursesList';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Course } from '@/types'
import { Head } from '@inertiajs/inertia-react';
import React, { FC } from 'react'

interface Props{
    courses:Course[];
}

const Favorites:FC<Props> = ({courses}) => {
    return (
        <>
            <Head title='My Favorites' />
            <DashboardLayout className='overflow-y-hidden'>
                <>
                    <div className='p-5 flex flex-col space-y-3.5 h-full overflow-y-hidden'>
                        <div className='h-auto'>
                            <p className='font-bold tracking-tight text-xl'>Favorite Courses</p>
                        </div>
                        <div className='flex-1 overflow-y-auto'>
                            <CoursesList className='h-full ' courses={courses} />
                        </div>
                    </div>
                </>
            </DashboardLayout>
        </>
    )
}

export default Favorites