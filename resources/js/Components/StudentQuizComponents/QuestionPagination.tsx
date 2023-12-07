import React, { FC } from 'react'
import { Button } from '../ui/button';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import { UserAnswer } from '@/Pages/StudentQuiz';

interface Props{
    onNext:()=>void;
    onBack:()=>void;
    onFirst:()=>void;
    onLast:()=>void;
    onSelect:(id:number)=>void;
    questionsIds:number[];
    currentId:number;
    isLast?:boolean;
    isFirst?:boolean;
}

const QuestionPagination:FC<Props> = ({onNext,onBack,onFirst,onLast,onSelect,questionsIds,currentId,isLast,isFirst}) => {
    return (
        <div className='flex items-center justify-center'>
            <Button disabled={isFirst} variant='outline' className='rounded-none border-muted-foreground border-l border-y' onClick={onFirst} size='sm'> <ChevronsLeftIcon className='w-4 h-4' /> </Button>
            <Button disabled={isFirst} variant='outline' className='rounded-none border-muted-foreground border-y' onClick={onBack} size='sm'> <ChevronLeftIcon className='w-4 h-4' /> </Button>
            {
                questionsIds.map((qId,_idx)=><Button key={qId} variant={qId===currentId?'ddc':'outline'} className='rounded-none border-muted-foreground border-y' onClick={()=>onSelect(qId)}  size='sm'>{(_idx+1).toString()}</Button>)
            }
            <Button disabled={isLast} variant='outline' className='rounded-none border-muted-foreground border-y' onClick={onNext} size='sm'> <ChevronRightIcon className='w-4 h-4' /> </Button>
            <Button disabled={isLast} variant='outline' className='rounded-none border-muted-foreground border-r border-y' onClick={onLast} size='sm'> <ChevronsRightIcon className='w-4 h-4' /> </Button>
        </div>
    )
}

export default QuestionPagination