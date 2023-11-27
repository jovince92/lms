import StudentCourseLayout from '@/Layouts/StudentCourseLayout';
import { Chapter, Course } from '@/types'
import React, { FC } from 'react'
import VideoPlayer from './VideoPlayer';
import CourseEnrollButon from '@/Components/StudentCourseComponents/CourseEnrollButon';
import { Separator } from '@/Components/ui/separator';
import Editor from './Editor';
import { FileIcon } from 'lucide-react';

interface Props{
    chapter:Chapter;
}

const StudentChapter:FC<Props> = ({chapter}) => {
    const {title,course} = chapter;
    const {attachments} = course;
    return (
        <StudentCourseLayout  course={course}>
            <div className='flex flex-col max-w-4xl mx-auto pb-20'>
                <div className='p-4'>
                    <VideoPlayer chapter={chapter} />
                </div>
                <div>
                    <div className='p-4 flex   flex-col md:flex-row items-center justify-between'>
                        <h2 className='text-2xl font-semibold mb-2'>{title}</h2>
                        <CourseEnrollButon course={course} />
                    </div>
                    <Separator />
                    <Editor readonly value={chapter.description!} />
                    {
                        attachments.length>0 && (
                            <>
                                <Separator />
                                <div className='p-3.5 flex flex-col space-y-1'>
                                    {attachments.map(attachment=> (
                                        <a href={attachment.attachment} target='_blank' className='flex items-center p-2.5 w-full bg-secondary border-border text-primary rounded-md hover:underline transition duration-300'>
                                            <FileIcon /> <p className='line-clamp-1'>  {attachment.name}</p>
                                        </a>) 
                                    )}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </StudentCourseLayout>
    )
}

export default StudentChapter