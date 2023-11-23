
import IconBadge from '@/Components/IconBadge';
import { Button } from '@/Components/ui/button';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Chapter } from '@/types';
import { Head, Link } from '@inertiajs/inertia-react';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import {FC} from 'react'

interface  Props{
    chapter:Chapter;
}

const Chapter:FC<Props> = ({chapter}) => {
    return (
        <>
            <Head title={`Chapter: ${chapter.title}`} />
            <DashboardLayout>
                <div className='p-5'>
                    <div className='flex items-center justify-between'>
                        <div className='w-full'>
                            <Link href={route('teacher.courses.show',{id:chapter.course_id})} >
                                <Button variant='ghost' size='sm'>
                                    <ArrowLeft className='h-4 w-4 mr-2' /> Back To {chapter.course.title} Course Setup
                                </Button>
                            </Link>
                            <div className='flex items-center justify-between w-full'>
                                <div className='flex flex-col gap-y-2'>
                                    <h1 className='text-2xl font-medium'>
                                        Chapter SetUp
                                    </h1>
                                    <span className='text-sm text-muted-foreground'>
                                        Complete All Required Parts (1/5)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-16'>
                        <div className='flex flex-col space-y-3.5'>
                            <div>
                                <div className='flex items-center gap-x-2'>
                                    <IconBadge Icon={LayoutDashboard} />
                                    <h2 className='text-xl'>Customize Your Chapter</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default Chapter