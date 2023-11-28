import { Progress } from '@/Components/ui/progress';
import { cn } from '@/lib/utils';
import { Course, PageProps } from '@/types'
import { Page } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import React, { FC, useMemo } from 'react'

interface Props{
    course:Course;
    className?:string;
}

const CourseProgressBar:FC<Props> = ({course,className}) => {
    const {my_progress} = usePage<Page<PageProps>>().props;
    const {chapters,id} = course;
    const courseProgress = useMemo(()=>my_progress.filter(progress=>progress.chapter.course_id===id),[id,my_progress]);
    const completedChapter = courseProgress.length>0?courseProgress.reduce((accumulator=0, currentValue)=>accumulator+(currentValue.is_completed===1?1:0),0):0;
    const percentage = Math.floor((completedChapter/chapters.length)*100);
    return (
        <div className='flex flex-col gap-y-1'>
            <Progress value={percentage} className={cn('h-2',className)} />
            <span className='text-xs font-medium text-muted-foreground'>{percentage}% Completed</span>
        </div>
    );
}

export default CourseProgressBar