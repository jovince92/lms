import { Chapter, PageProps } from '@/types'
import { Inertia, Page } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import React, { FC, useMemo, useState } from 'react'
import { Button } from '../ui/button';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useConfettiStore } from '@/Hooks/useConfettiStore';

interface Props{
    chapter:Chapter;
    isLastChapter:1|0;
}

const CourseProgressButton:FC<Props> = ({chapter,isLastChapter}) => {
    const  [loading,setLoading] = useState(false);
    const {onOpen} = useConfettiStore();
    const {id,course_id} = chapter;
    const {my_progress} = usePage<Page<PageProps>>().props;
    const isCompleted = useMemo(()=>my_progress.findIndex(progress=>progress.chapter_id===id&&progress.is_completed===1)>-1,[id,my_progress]);
    const Icon = isCompleted? XCircle: CheckCircle;

    const onClick = () =>{
        Inertia.post(route('course.toggle',{course_id,id}),{
            is_completed:isCompleted?0:1
        },{
            onStart:()=>setLoading(true),
            onSuccess:()=>toast.success(isCompleted?'Chapter marked as Incomplete':'Chapter Completed!'),
            onError:()=>toast.error('Something went Wrong. Please try again'),
            preserveState:true,
            preserveScroll:true,
            onFinish:()=>{
                setLoading(false);
                if(isLastChapter && !isCompleted) {
                    toast.success('Congratulations!! You Have Finished The Course!');
                    onOpen();
                }
            }
        });
    }

    return (
        <Button disabled={loading} onClick={onClick} type='button' variant={isCompleted?'destructive':'outline'} className='w-full md:w-auto'>
            {isCompleted?'Mark as Incomplete':'Mark as Complete'}
            {loading? <Loader2 className='h-4 w-4 ml-2'/>: <Icon className='h-4 w-4 ml-2' />}
        </Button>
    )
}

export default CourseProgressButton