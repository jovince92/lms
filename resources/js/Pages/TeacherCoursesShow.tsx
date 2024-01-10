import Banner from '@/Components/Banner'
import IconBadge from '@/Components/IconBadge'
import AttachmentForm from '@/Components/TeacherCoursesComponents/AttachmentForm'
import CategoryForm from '@/Components/TeacherCoursesComponents/CategoryForm'
import ChapterForm from '@/Components/TeacherCoursesComponents/ChapterForm'
import CourseActions from '@/Components/TeacherCoursesComponents/CourseActions'
import DescriptionForm from '@/Components/TeacherCoursesComponents/DescriptionForm'
import ImageForm from '@/Components/TeacherCoursesComponents/ImageForm'
import LanguageForm from '@/Components/TeacherCoursesComponents/LanguageForm'
import QuizForm from '@/Components/TeacherCoursesComponents/QuizForm'
import RestrictionForm from '@/Components/TeacherCoursesComponents/RestrictionForm'
import TitleForm from '@/Components/TeacherCoursesComponents/TitleForm'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Course } from '@/types'
import { Head } from '@inertiajs/inertia-react'
import { FileIcon, GraduationCap, LayoutDashboard, ListChecks, XOctagon } from 'lucide-react'
import {FC, useMemo} from 'react'

interface Props{
    course:Course
}

const TeacherCoursesShow:FC<Props> = ({course}) => {

    const completedFields = useMemo(()=>{
        let  completedFields=1;
        if(course.description&&course.description?.length>0) completedFields=completedFields+1;
        if(course.image&&course.image?.length>0) completedFields=completedFields+1;
        if(course.category_id&&course.category) completedFields=completedFields+1;
        if(course.language_id&&course.language) completedFields=completedFields+1;
        if(course.chapters.some(chapter=>chapter.is_published===1)) completedFields=completedFields+1;
        return completedFields;
    },[course]);

    

    return (
        <>
            <Head title={course.title} />
            <DashboardLayout>
                
                <div className='p-5 flex flex-col h-full overflow-y-hidden'>
                    {
                        course.is_published!==1 && <Banner variant='warning' label='This Course is not Published. It will not be visible to Students' />
                    }
                    <div className='flex items-center justify-between h-auto'>
                        <div className='flex flex-col gap-y-1.5'>
                            <h1 className='text-2xl font-medium'>
                                Course Setup
                            </h1>
                            <span className='text-sm text-muted-foreground'>
                                Complete All Required Parts ({completedFields.toString()}/6)
                            </span>
                        </div>
                        <CourseActions course={course} />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-16 flex-1 overflow-y-auto'>
                        <div>
                            <div className='flex items-center gap-x-1.5'>
                                <IconBadge Icon={LayoutDashboard}  />
                                <h2 className='text-xl'>Customize your course</h2>
                            </div>
                            <TitleForm  course={course} />
                            <DescriptionForm course={course} />
                            <LanguageForm course={course} />
                            <ImageForm course={course} />
                            <CategoryForm course={course} />
                        </div>
                        <div className='flex flex-col space-y-5'>
                            <div>
                                <div className='flex items-center gap-x-2'>
                                    <IconBadge Icon={ListChecks} />
                                    <h2 className='text-xl'>Course Chapters</h2>
                                </div>
                                <ChapterForm course={course} />
                            </div>
                            <div>
                                <div className='flex items-center gap-x-2'>
                                    <IconBadge Icon={FileIcon} />
                                    <h2 className='text-xl'>Resources & Attachments</h2>
                                </div>
                                
                                <AttachmentForm course={course} />
                            </div>
                            <div>
                                <div className='flex items-center gap-x-2'>
                                    <IconBadge Icon={GraduationCap} />
                                    <h2 className='text-xl'>Course Quiz</h2>
                                </div>
                                <QuizForm course={course} />
                            </div>
                            <div>
                                <div className='flex items-center gap-x-2'>
                                    <IconBadge Icon={XOctagon} />
                                    <h2 className='text-xl'>Course Restrictions</h2>
                                </div>
                                <RestrictionForm course={course} />
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default TeacherCoursesShow