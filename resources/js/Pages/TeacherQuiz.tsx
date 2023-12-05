import Banner from '@/Components/Banner';
import QuizForm from '@/Components/TeacherCoursesComponents/QuizForm';
import QuestionFormSheet from '@/Components/TeacherQuizComponents/QuestionFormSheet';
import QuestionItem from '@/Components/TeacherQuizComponents/QuestionItem';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Separator } from '@/Components/ui/separator';
import { useQuestionFormSheet } from '@/Hooks/useQuestionFormSheet';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Quiz } from '@/types'
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, useForm } from '@inertiajs/inertia-react'
import { ArrowLeft, Pencil, PencilLineIcon, PlusCircle } from 'lucide-react';
import React, { FC, FormEventHandler, useState } from 'react'
import { toast } from 'sonner';

interface Props{
    quiz:Quiz;
}

const TeacherQuiz:FC<Props> = ({quiz}) => {
    const {quiz_questions,id,course_id} = quiz;
    const {onOpen} = useQuestionFormSheet();

    const {data,setData,processing,post} = useForm({name:quiz.name})
    const [isEditing,setIsEditing] = useState(false);

    const publishToggle = () =>{
        if(!quiz.quiz_questions || quiz.quiz_questions.length<5) return toast.error('Quiz must contain at least 5 question to Publish.');
        Inertia.post(route('teacher.courses.quiz.publish_toggle',{course_id,id}),{
            is_published:quiz.is_published===1?0:1
        },{
            onSuccess:()=>toast.success(`${quiz.is_published===0?'Quiz Published!':'Quiz Un-Published!'}`),
            onError:()=>toast.error('Something went wrong. Please try again')
        })
    }

    const onSubmit:FormEventHandler<HTMLFormElement> = e =>{
        e.preventDefault();
        post(route('teacher.courses.quiz.rename',{course_id,id}),{
            onSuccess:()=>{
                toast.success('Quiz Renamed');
                setIsEditing(false);
            },
            onError:()=>toast.error('Something went wrong. Please try again')
        });
    }
    return (
        <>
            <Head title={`Quiz: ${quiz.name}`} />
            
            <DashboardLayout className='overflow-y-hidden'>
                <>
                    {
                        quiz.is_published!==1 && <Banner variant='warning' label='This Quiz is not Published. It will not be visible to Students' />
                    }
                    <div className='p-5 h-full overflow-y-hidden flex flex-col space-y-0.5'>
                        <div className='flex items-center justify-between h-auto'>
                            <div className='w-full'>
                                <Link href={route('teacher.courses.show',{id:quiz.course_id})} >
                                    <Button className='mb-5' variant='link' size='sm'>
                                        <ArrowLeft className='h-4 w-4 mr-2' /> Back To {quiz.course.title} Course Setup
                                    </Button>
                                </Link>
                                <div className='flex flex-col space-y-2.5 md:space-y-0 md:flex-row md:items-center md:justify-between w-full'>
                                    <div className='flex flex-col gap-y-2 w-full'>
                                        <h1 className='text-xl font-medium'>
                                            Quiz SetUp
                                        </h1>
                                        
                                        <div className='flex flex-col space-y-1 w-full pt-5'>
                                            <div className='flex items-center space-x-0.5 font-semibold tracking-tight mr-auto'>
                                                {
                                                    !isEditing?(
                                                        <>
                                                            <span>
                                                                {quiz.name}
                                                            </span>
                                                            <Button onClick={()=>setIsEditing(true)} variant='ghost' size='icon'>
                                                                <PencilLineIcon className='w-5 h-5' />
                                                            </Button>
                                                        </>
                                                    ): (
                                                        <form onSubmit={onSubmit}>
                                                            <Input autoFocus autoComplete='off' value={data.name} onChange={({target})=>setData('name',target.value)} disabled={processing} />
                                                        </form>
                                                    )
                                                }
                                                
                                            </div>
                                            <span className='text-xs text-muted-foreground'>
                                                {quiz.quiz_questions.length} Question/s.
                                            </span>
                                        </div>
                                        
                                    </div>
                                    <div className='flex items-center space-x-1'>
                                        <Button onClick={()=>onOpen(quiz.id)} variant='ddc' size='sm'>
                                            <PlusCircle className='h-5 w-5 mr-2' />Add a Question
                                        </Button>
                                        <Button onClick={publishToggle} variant='outline' size='sm'>
                                            {quiz.is_published===0?'Publish':'Un-Publish'}
                                        </Button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <Separator className='my-3.5' />
                        <div className='flex flex-col space-y-3.5 flex-1 overflow-y-auto pb-4'>
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