import DashboardLayout from '@/Layouts/DashboardLayout';
import StudentCourseLayout from '@/Layouts/StudentCourseLayout';
import { Course } from '@/types'
import React, { FC } from 'react'

interface Props{
    course:Course;
}

const StudentCourse:FC<Props> = ({course}) => {
    return (
        <DashboardLayout >
            <div>Course</div>
        </DashboardLayout>
    )
}

export default StudentCourse