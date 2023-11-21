import DashboardLayout from '@/Layouts/DashboardLayout'
import { Course } from '@/types'
import {FC} from 'react'

interface Props{
    course:Course
}

const TeacherCoursesShow:FC<Props> = ({course}) => {
    return (
        <DashboardLayout>
            {course.title}
        </DashboardLayout>
    )
}

export default TeacherCoursesShow