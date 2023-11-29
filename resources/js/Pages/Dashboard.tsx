import CoursesList from '@/Components/CoursesList';
import InfoCard from '@/Components/DashboardComponents/InfoCard';
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Course } from '@/types'
import { Link } from '@inertiajs/inertia-react'
import { CheckCircle, Clock } from 'lucide-react';
import React, { FC } from 'react'

interface Props{
    completed_courses:Course[];
    ongoing_courses:Course[];
}

const Dashboard:FC<Props> = ({completed_courses,ongoing_courses}) => {
    return (
        <DashboardLayout>
            <div  className='p-6 flex flex-col  space-y-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <InfoCard label='Courses In Progress' lenght={ongoing_courses.length}  Icon={Clock} />
                    <InfoCard label='Completed Courses' lenght={completed_courses.length}  Icon={CheckCircle} />
                </div>
                <CoursesList courses={[...ongoing_courses,...completed_courses]} />
            </div>
        </DashboardLayout>
    )
}

export default Dashboard