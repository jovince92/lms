import IconBadge from '@/Components/IconBadge'
import DescriptionForm from '@/Components/TeacherCoursesComponents/DescriptionForm'
import TitleForm from '@/Components/TeacherCoursesComponents/TitleForm'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Course } from '@/types'
import { LayoutDashboard } from 'lucide-react'
import {FC} from 'react'

interface Props{
    course:Course
}

const TeacherCoursesShow:FC<Props> = ({course}) => {
    return (
        <DashboardLayout>
            <div className='p-6'>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-y-1.5'>
                        <h1 className='text-2xl font-medium'>
                            Course Setup
                        </h1>
                        <span className='text-sm text-muted-foreground'>
                            Complete All Fields  (1/5)
                        </span>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-16'>
                    <div>
                        <div className='flex items-center gap-x-1.5'>
                            <IconBadge Icon={LayoutDashboard}  />
                            <h2 className='text-xl'>Customize your course</h2>
                        </div>
                        <TitleForm  course={course} />
                        <DescriptionForm course={course} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default TeacherCoursesShow