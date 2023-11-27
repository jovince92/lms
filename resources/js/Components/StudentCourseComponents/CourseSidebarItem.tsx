import { cn } from '@/lib/utils';
import { Chapter } from '@/types'
import { Inertia } from '@inertiajs/inertia';
import { PlayCircle } from 'lucide-react';
import React, { FC, useMemo } from 'react'

interface Props{
    chapter:Chapter;
}

const CourseSidebarItem:FC<Props> = ({chapter}) => {

    // TODO: CHECKICON IF COMPLETED ELSE PLAY

    
    const  {title,id,course_id} = chapter;
    const onClick = () => Inertia.get(route('course.chapter',{id,course_id}));

    const active = useMemo(()=>route().current('course.chapter',{id,course_id}),[id,course_id]);

    return (
        <button onClick={onClick} type='button' className={cn('flex items-center gap-x-2 text-muted-foreground text-sm font-medium pl-6  transition-all hover:bg-secondary',
                active&&'text-primary font-semibold'
            )}>
            <div className='flex items-center gap-x-2 py-4'>
                <PlayCircle size={22} className={cn('text-muted-foreground',
                        active&&'text-primary'
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