import { DataTable } from '@/Components/DataTable'
import { AnalyticsColumns } from '@/Components/TeacherAnalyticsComponents/AnalyticsColumns'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Course, User } from '@/types'
import { Head } from '@inertiajs/inertia-react'
import React, { FC } from 'react'

export type AnalyticsData = {
    chapter_count:number;
    completed_chapters:number;
    course:Course;
    course_id:number;
    user:User;
    user_id:number;
    date_started:string;
}

interface AnalyticsProps{
    progress:AnalyticsData[]
}

const TeacherAnalytics:FC<AnalyticsProps> = ({progress}) => {
    console.log(progress);
    return (
        <>
            <Head title='Analytics' />
            <DashboardLayout className='overflow-y-hidden'>
                <div className='p-6 flex flex-col h-full'>
                
                    <DataTable columns={AnalyticsColumns} data={progress} />
                    
                </div>
            </DashboardLayout>
        </>
    )
}

export default TeacherAnalytics