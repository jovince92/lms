import { cn } from '@/lib/utils';
import { Chapter, PageProps } from '@/types'
import { Inertia, Page } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { CheckCircle, PlayCircle } from 'lucide-react';
import React, { FC, useMemo } from 'react'

interface Props{
    chapter:Chapter;
}

const CourseSidebarItem:FC<Props> = ({chapter}) => {

    

    const {my_progress} = usePage<Page<PageProps>>().props;
    const  {title,id,course_id} = chapter;
    const onClick = () => Inertia.get(route('course.chapter',{id,course_id}));

    const active = useMemo(()=>route().current('course.chapter',{id,course_id}),[id,course_id]);

    const isCompleted = useMemo(()=>my_progress.findIndex(progress=>progress.chapter_id===id&&progress.is_completed===1)>-1,[id,my_progress]);

    const Icon = isCompleted?CheckCircle:PlayCircle;

    return (
        <button onClick={onClick} type='button' className={cn('flex items-center gap-x-2 text-muted-foreground text-sm font-medium pl-6  transition-all hover:bg-secondary',
                active&&'text-primary font-semibold',
                isCompleted&&'text-green-800 dark:text-green-500'
            )}>
            <div className='flex items-center gap-x-2 py-4'>
                <Icon size={22} className={cn('text-muted-foreground',
                        active&&'text-primary',
                        isCompleted&&'text-green-800 dark:text-green-500'
                    )} />
                {title}
            </div>
            <div className={cn('ml-auto opacity-0 border-2 border-idcsi h-full transition-all',
                    active&&'opacity-100'
                )} />
        </button>
    )
}

export default CourseSidebarItem