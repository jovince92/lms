import StudentCourseLayout from '@/Layouts/StudentCourseLayout';
import { Quiz } from '@/types'
import { Head } from '@inertiajs/inertia-react';
import React, { FC } from 'react'

interface Props{
    quiz:Quiz;
}

const StudentQuiz:FC<Props> = ({quiz}) => {
    return (
        <>
            <Head title={`Taking Quiz: ${quiz.name}`}  />
            <StudentCourseLayout showSidebar={false} course={quiz.course}>
                <div className='flex flex-col max-w-4xl mx-auto pb-20'>
                    Take QUIZ
                </div>
            </StudentCourseLayout>
        </>
    )
}

export default StudentQuiz