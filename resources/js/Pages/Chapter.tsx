
import Banner from '@/Components/Banner';
import ChapterActions from '@/Components/ChapterComponents/ChapterActions';
import ChapterDescriptionForm from '@/Components/ChapterComponents/ChapterDescriptionForm';
import ChapterTitleForm from '@/Components/ChapterComponents/ChapterTitleForm';
import ChapterVideoForm from '@/Components/ChapterComponents/ChapterVideoForm';
import IconBadge from '@/Components/IconBadge';
import { Button } from '@/Components/ui/button';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Chapter } from '@/types';
import { Head, Link } from '@inertiajs/inertia-react';
import { ArrowLeft, LayoutDashboard, VideoIcon } from 'lucide-react';
import {FC, useMemo} from 'react'

interface  Props{
    chapter:Chapter;
}

const Chapter:FC<Props> = ({chapter}) => {
    const completedFields = useMemo(()=>{
        let  completedFields=1;
        if(chapter.description&&chapter.description?.length>0) completedFields=completedFields+1;
        if(chapter.video&&chapter.video?.length>0) completedFields=completedFields+1;
        return completedFields;
    },[chapter]);
    return (
        <>
            <Head title={`Chapter: ${chapter.title}`} />
            
            <DashboardLayout>
                <>
                    {
                        chapter.is_published!==1 && <Banner variant='warning' label='This Chapter is not Published. It will not be visible to Students' />
                    }
                    <div className='p-5'>
                        <div className='flex items-center justify-between'>
                            <div className='w-full'>
                                <Link href={route('teacher.courses.show',{id:chapter.course_id})} >
                                    <Button className='mb-5' variant='link' size='sm'>
                                        <ArrowLeft className='h-4 w-4 mr-2' /> Back To {chapter.course.title} Course Setup
                                    </Button>
                                </Link>
                                <div className='flex items-center justify-between w-full'>
                                    <div className='flex flex-col gap-y-2'>
                                        <h1 className='text-2xl font-medium'>
                                            Chapter SetUp
                                        </h1>
                                        <span className='text-sm text-muted-foreground'>
                                            Complete All Required Parts ({completedFields}/3)
                                        </span>
                                    </div>
                                    <ChapterActions chapter={chapter} />
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
                                <ChapterTitleForm chapter={chapter} />
                                <ChapterDescriptionForm chapter={chapter} />
                            </div>
                            <div>
                                <div className='flex items-center gap-x-2'>
                                    <IconBadge Icon={VideoIcon} />
                                    <h2 className='text-xl'>Add A Video</h2>
                                </div>
                                <ChapterVideoForm chapter={chapter} />
                            </div>
                            
                        </div>
                    </div>
                </>
            </DashboardLayout>
        </>
    )
}

export default Chapter