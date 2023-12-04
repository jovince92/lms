import Banner from '@/Components/Banner';
import QuizForm from '@/Components/TeacherCoursesComponents/QuizForm';
import QuestionFormSheet from '@/Components/TeacherQuizComponents/QuestionFormSheet';
import QuestionItem from '@/Components/TeacherQuizComponents/QuestionItem';
import { Button } from '@/Components/ui/button';
import { Separator } from '@/Components/ui/separator';
import { useQuestionFormSheet } from '@/Hooks/useQuestionFormSheet';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Quiz } from '@/types'
import { Head, Link } from '@inertiajs/inertia-react'
import { ArrowLeft, PlusCircle } from 'lucide-react';
import React, { FC } from 'react'

interface Props{
    quiz:Quiz;
}

const TeacherQuiz:FC<Props> = ({quiz}) => {
    const {quiz_questions} = quiz;
    const {onOpen} = useQuestionFormSheet();
    return (
        <>
            <Head title={`Quiz: ${quiz.name}`} />
            
            <DashboardLayout>
                <>
                    {
                        quiz.is_published!==1 && <Banner variant='warning' label='This Quiz is not Published. It will not be visible to Students' />
                    }
                    <div className='p-5'>
                        <div className='flex items-center justify-between'>
                            <div className='w-full'>
                                <Link href={route('teacher.courses.show',{id:quiz.course_id})} >
                                    <Button className='mb-5' variant='link' size='sm'>
                                        <ArrowLeft className='h-4 w-4 mr-2' /> Back To {quiz.course.title} Course Setup
                                    </Button>
                                </Link>
                                <div className='flex items-center justify-between w-full'>
                                    <div className='flex flex-col gap-y-2'>
                                        <h1 className='text-2xl font-medium'>
                                            Quiz SetUp
                                        </h1>
                                        <span className='text-sm text-muted-foreground'>
                                            {quiz.quiz_questions.length} Question/s.
                                        </span>
                                    </div>
                                    <Button onClick={()=>onOpen(quiz.id)} variant='ddc' size='sm'>
                                        <PlusCircle className='h-5 w-5 mr-2' />Add a Question
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Separator className='my-3.5' />
                        <div className='flex flex-col space-y-3.5'>
                            <p className='text-xl font-semibold tracking-tight my-2.5'>Questions:</p>
                            {
                                quiz_questions.map((question,i)=> <QuestionItem key={question.id} question={question} number={i+1} /> )
                            }
                        </div>
                    </div>
                </>
            </DashboardLayout>
            <QuestionFormSheet />
        </>
    )
}

export default TeacherQuiz