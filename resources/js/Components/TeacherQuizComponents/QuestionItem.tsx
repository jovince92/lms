import Editor from '@/Pages/Editor';
import { QuizQuestion } from '@/types'
import React, { FC } from 'react'
import { Button } from '../ui/button';
import { CheckCircle, CircleDot, Dot, MoreVertical, PencilLine, Trash2 } from 'lucide-react';
import { useQuestionFormSheet } from '@/Hooks/useQuestionFormSheet';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import ConfirmModal from '../Modals/ConfirmModal';
import { Inertia } from '@inertiajs/inertia';
import { toast } from 'sonner';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';

interface Props{
    question:QuizQuestion;
    number:number
}

const QuestionItem:FC<Props> = ({question,number}) => {
    
    const {onOpen} = useQuestionFormSheet();

    const onDelete = () =>{
        Inertia.post(route('teacher.courses.quiz.question.destroy',{id:question.id}),{},{
            onSuccess:()=>toast.success('Question Deleted!'),
            onError:()=>toast.error('Something Went Wrong. Please try again')
        })
    }

    return (
        <div className='w-full flex items-start space-x-0.5 relative group'>
            
            <p className='pt-3' >{`${number.toString()})`}</p>
            <div className='flex-1'>
                <div className='w-full flex flex-col space-x-1'>
                    <Editor readonly value={question.question} />
                    <p className='text-primary/80 text-xs pl-3'>{question.question_type}</p>
                    <Separator className='my-3' />
                    {
                        question.type===1?(
                            <div className='w-full'>
                                <ul className='text-sm text-muted-foreground flex flex-col space-y-1'>
                                    {question.quiz_choices.map(c=> (
                                        <li key={c.id} className={cn('font-normal flex items-center',question.quiz_answer.answer===c.choice&&'font-medium text-primary')}>
                                            {question.quiz_answer.answer===c.choice?<CheckCircle className='h-5 w-5 mr-2' />:<CircleDot className='h-5 w-5 mr-2' />}
                                            <span>{c.choice}</span>
                                            <span>{question.quiz_answer.answer===c.choice&&' - Correct Answer'}</span>
                                        </li>)
                                    )}
                                </ul>
                            </div>
                        ):(
                            <div className='flex items-center space-x-2'>
                                <Label>Correct Answer:</Label>
                                <p className='text-lg font-medium'>{question.quiz_answer.answer}</p>
                            </div>
                        )
                    }
                </div>
            </div>
            
            <Popover>
                <PopoverTrigger asChild>
                    <Button size='icon' className='mt-3 mr-3' variant='ghost'>
                        <MoreVertical className='w-5 h-5' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent asChild side='right' className='p-1 border w-36' >
                    <div className='flex flex-col space-y-1  '>
                        <Button size='sm'  variant='outline' className='justify-start' onClick={()=>onOpen(question.quiz_id,question)} >
                            <PencilLine className='h-4 w-4 mr-2' /> Edit 
                        </Button>
                        <ConfirmModal onConfirm={onDelete}>
                            <Button size='sm' variant='outline' className='justify-start'  >
                                <Trash2 className='h-4 w-4 mr-2' /> Delete 
                            </Button>
                        </ConfirmModal>
                    </div>
                </PopoverContent>
            </Popover>
                
            
        </div>
    )
}

export default QuestionItem;
