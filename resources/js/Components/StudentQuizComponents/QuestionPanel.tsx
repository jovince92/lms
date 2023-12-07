import Editor from '@/Pages/Editor';
import { QuizQuestion } from '@/types'
import React, { FC } from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { UserAnswer } from '@/Pages/StudentQuiz';
import { ArrowRightSquare } from 'lucide-react';

interface Props{
    question:QuizQuestion;
    answer?: UserAnswer;
    onAnswer:(ua:UserAnswer)=>void;
    isLast?:boolean;
    onNext:()=>void;
}
const QuestionPanel:FC<Props> = ({question,answer,onAnswer,isLast,onNext}) => {
    const {question_type,question:questionTxt,type,quiz_choices,id} = question;
    return (
        <div className='bg-muted/50 h-full w-full rounded-md overflow-y-auto relative'>
            <p className='text-muted-foreground italic text-xs p-3'>{question_type}</p>
            <Editor value={questionTxt} readonly />
            {
                
                type===1 && (
                    <div className='p-3 flex flex-col gap-y-2 w-full md:w-96'>
                        <p className='text-sm text-primary/75'>Choose the Correct Answer</p>
                        {
                            quiz_choices.map(choice=> <Button key={choice.id} onClick={()=>onAnswer({answer:choice.choice,quiz_question_id:id})} variant={answer?.answer.toLowerCase().trim()===choice.choice.toLowerCase().trim()?'ddc':'default'}>{choice.choice}</Button> )
                        }
                    </div>
                )
            }
            {
                type===2 && (
                    <div className='p-3 flex flex-col gap-y-2 w-full md:w-72'>
                        <p className='text-sm text-primary/75'>Type Your Answer Below:</p>
                        <Input placeholder='Type your answer here...' className='placeholder:italic' value={answer?.answer||""} onChange={({target})=>onAnswer({answer:target.value,quiz_question_id:id})} autoComplete='off' autoFocus />
                        
                    </div>
                )
            }

            <Button disabled={!answer?.answer} onClick={onNext} size='sm' className='absolute top-2 right-2.5'>{  `${isLast?'Finish The Quiz':'Next Question'}`} </Button>

        </div>
    )
}

export default QuestionPanel