import { DataTable } from '@/Components/DataTable'
import { CourseColumns } from '@/Components/TeacherCoursesComponents/CourseColumns'
import { Button } from '@/Components/ui/button'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Course } from '@/types'
import { Head, Link } from '@inertiajs/inertia-react'
import  { FC } from 'react'

interface Props{
    courses:Course[];
}

const TeacherCourses:FC<Props> = ({courses}) => {
    return (
        <>
            <Head title='Courses' />
            <DashboardLayout className='overflow-y-hidden'>
                <div className='p-6 flex flex-col h-full'>
                
                    <Link href={route('teacher.courses.create')}>
                        <Button variant='ddc'>New Course</Button>
                    </Link>
                
                    <DataTable columns={CourseColumns} data={courses} />
                    
                </div>
            </DashboardLayout>
        </>
    )
}

export default TeacherCourses