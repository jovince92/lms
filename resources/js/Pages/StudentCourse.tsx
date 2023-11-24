import StudentCourseLayout from '@/Layouts/StudentCourseLayout';
import { Course } from '@/types'
import React, { FC } from 'react'

interface Props{
    course:Course;
}

const StudentCourse:FC<Props> = ({course}) => {
    return (
        <StudentCourseLayout course={course}>
            <div>Course</div>
        </StudentCourseLayout>
    )
}

export default StudentCourse