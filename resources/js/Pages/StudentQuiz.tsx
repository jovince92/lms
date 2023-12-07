import QuestionPagination from '@/Components/StudentQuizComponents/QuestionPagination';
import QuestionPanel from '@/Components/StudentQuizComponents/QuestionPanel';
import StudentCourseLayout from '@/Layouts/StudentCourseLayout';
import { Quiz, QuizQuestion } from '@/types'
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/inertia-react';
import React, { FC,useState,useMemo } from 'react';

interface Props{
    quiz:Quiz;
    score:number;
    is_completed:1|0;
}

export type UserAnswer = {
    quiz_question_id:number;
    answer:string;
}

const StudentQuiz:FC<Props> = ({quiz,is_completed,score}) => {
    const {quiz_questions,course,course_id,id} = quiz;
    const questions = useMemo(()=>shuffleQuestions(quiz_questions),[quiz_questions]) ;
    const [currentQuestion,setCurrentQuestion] = useState(questions[0]);
    const [userAnswers,setUserAnswers] = useState<UserAnswer[]>([]);
    const isFirstQuestion = questions.findIndex(q=>q.id===currentQuestion.id)===0;
    const isLastQuestion = questions.findIndex(q=>q.id===currentQuestion.id)===(questions.length-1);

    const onBack = () =>{
        if(isFirstQuestion) return;
        const prevIndex = questions.findIndex(q=>q.id===currentQuestion.id) -1;
        setCurrentQuestion(questions[prevIndex]);
    }

    const onNext = () =>{
        if(isLastQuestion) return;
        const nextIndex = questions.findIndex(q=>q.id===currentQuestion.id) +1;
        setCurrentQuestion(questions[nextIndex]);
    }

    const onAnswer = (userAnswer:UserAnswer) =>{
        if(userAnswers.findIndex(ua=>ua.quiz_question_id===userAnswer.quiz_question_id)>-1){
            return setUserAnswers(val=>val.map(ua=>ua.quiz_question_id===userAnswer.quiz_question_id?userAnswer:ua));
        }
        setUserAnswers(val=>[...val,userAnswer]);
    }

    const onFinish = () =>{
        Inertia.post(route('course.quiz.store',{course_id}),{
            id, //@ts-ignore
            question_answers:userAnswers
        });
    }

    if(is_completed===1){
        return(
            <>
                <Head title={`Taking Quiz: ${quiz.name}`}  />
                <StudentCourseLayout showSidebar={false} course={quiz.course} className='overflow-hidden '>
                    <div className='w-full flex flex-col space-y-1.5 h-auto'>
                        <div className='flex flex-col space-y-2'>
                            <p className='text-center text-xl font-semibold tracking-tight'>{course.title}</p>
                            <p className='text-center font-medium text-lg'>{quiz.name}</p>
                        </div>
                    </div>
                    <p className='text-xl font-bold tracking-tight pt-6 text-center'>
                        You Have Already Completed This Quiz!
                    </p>
                    <div className='text-center text-lg font-semibold'>
                        Your Score:
                        <p className='text-center font-medium text-muted-foreground'>
                            {score}/{questions.length}
                        </p>
                    </div>
                    
                </StudentCourseLayout>
            </>
        );
    }

    return (
        <>
            <Head title={`Taking Quiz: ${quiz.name}`}  />
            <StudentCourseLayout showSidebar={false} course={quiz.course} className='overflow-hidden '>
                <div className='flex flex-col gap-y-2.5 max-w-4xl mx-auto pb-3.5 h-full'>
                    <div className='w-full flex flex-col space-y-1.5 h-auto'>
                        <div className='flex flex-col space-y-2'>
                            <p className='text-center text-xl font-semibold tracking-tight'>{course.title}</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='text-center font-medium text-lg'>{quiz.name}</p>
                            <p className='font-medium'>Progress: {`${userAnswers.length}/${questions.length}`} </p>
                        </div>
                    </div>
                    <div className='flex-1 overflow-y-auto'>
                        <QuestionPanel isLast={isLastQuestion} onNext={()=> isLastQuestion? onFinish(): onNext()} onAnswer={onAnswer} answer={userAnswers.find(ua=>ua.quiz_question_id===currentQuestion.id)} question={currentQuestion} />
                    </div>
                    <div className='h-auto overflow-x-auto'>
                        <QuestionPagination
                            //answer={userAnswers.find(ua=>ua.quiz_question_id===currentQuestion.id)}
                            isFirst={isFirstQuestion}
                            isLast={isLastQuestion}
                            currentId={currentQuestion.id} 
                            questionsIds={questions.map(({id})=>(id))} 
                            onFirst={()=>setCurrentQuestion(questions[0])} 
                            onBack={onBack} 
                            onNext={onNext} 
                            onLast={()=>setCurrentQuestion(questions[questions.length-1])} 
                            onSelect={(id)=>{setCurrentQuestion(questions.find(q=>q.id===id)!)}} 
                            />
                    </div>
                </div>
            </StudentCourseLayout>
        </>
    )
}

export default StudentQuiz;


const shuffleQuestions = (questions:QuizQuestion[]):QuizQuestion[] =>{
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    
    return questions;
}