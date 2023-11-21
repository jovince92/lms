import { Button } from '@/Components/ui/button'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Link } from '@inertiajs/inertia-react'
import React, { FC } from 'react'

const TeacherCourses:FC = () => {
    return (
        <DashboardLayout>
            <div className='p-6'>
                <Link href={route('teacher.courses.create')}>
                    <Button>New Course</Button>
                </Link>
            </div>
        </DashboardLayout>
    )
}

export default TeacherCourses