import CoursesList from '@/Components/CoursesList';
import InfoCard from '@/Components/DashboardComponents/InfoCard';
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Course, PageProps } from '@/types'
import { Page } from '@inertiajs/inertia';
import { Head, Link, usePage } from '@inertiajs/inertia-react'
import { CheckCircle, Clock, Heart } from 'lucide-react';
import React, { FC } from 'react'

interface Props{
    completed_courses:Course[];
    ongoing_courses:Course[];
}

const Dashboard:FC<Props> = ({completed_courses,ongoing_courses}) => {
    const {my_favorites} = usePage<Page<PageProps>>().props;
    return (
        <>
            <Head title='Dashboard' />
            <DashboardLayout className='overflow-y-hidden'>
                <div  className='p-5 flex flex-col space-y-3.5 h-full overflow-y-hidden'>
                    <div className='grid grid-cols-1 sm:grid-cols-2  gap-4 h-auto'>
                        <InfoCard label='Courses In Progress' lenght={ongoing_courses.length}  Icon={Clock} />
                        <InfoCard label='Completed Courses' lenght={completed_courses.length}  Icon={CheckCircle} />
                        
                        {/* <InfoCard label='Favorited Courses' lenght={my_favorites.length}  Icon={Heart} /> */}
                    </div>
                    <div className='flex-1 overflow-y-auto'>
                        <CoursesList className='h-full ' courses={[...ongoing_courses,...completed_courses]}  />
                    </div>
                    
                </div>
            </DashboardLayout>
        </>
    )
}

export default Dashboard