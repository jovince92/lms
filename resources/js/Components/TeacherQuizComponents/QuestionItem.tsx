import Editor from '@/Pages/Editor';
import { QuizQuestion } from '@/types'
import React, { FC } from 'react'
import { Button } from '../ui/button';
import { PencilLine, Trash2 } from 'lucide-react';
import { useQuestionFormSheet } from '@/Hooks/useQuestionFormSheet';

interface Props{
    question:QuizQuestion;
    number:number
}

const QuestionItem:FC<Props> = ({question,number}) => {
    
    const {onOpen} = useQuestionFormSheet();
    return (
        <div className='w-full flex items-start space-x-0.5 relative group'>
            <div className='absolute opacity-0 group-hover:opacity-100 transition duration-300 flex items-center space-x-1.5 top-3 right-3 z-50 bg-secondary rounded-md p-2.5'>
                <Button onClick={()=>onOpen(question.quiz_id,question)} size='icon' variant='outline'>
                    <PencilLine className='h-5 w-5'  />
                </Button>
                <Button size='icon' variant='destructive'>
                    <Trash2 className='h-5 w-5'  />
                </Button>
            </div>
            <p className='pt-3' >{`${number.toString()})`}</p>
            <div className='flex-1'>
                <Editor readonly value={question.question} />
            </div>
        </div>
    )
}

export default QuestionItem