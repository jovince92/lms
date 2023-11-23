import { Chapter } from '@/types'
import React, { FC, useMemo } from 'react'
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import ConfirmModal from '../Modals/ConfirmModal';
import { Inertia } from '@inertiajs/inertia';
import { toast } from 'sonner';

interface Props{
    chapter:Chapter;
}

const ChapterActions:FC<Props> = ({chapter}) => {
    const {course_id,id,is_published} = chapter;
    const isComplete = useMemo(()=>{
        if(!chapter.title||chapter.title.length<1) return false;
        if(!chapter.description||chapter.description?.length<1) return false;
        if(!chapter.video||chapter.video?.length<1) return false;
        return true;
    },[chapter]);

    const onTogglePublish = () =>{
        const label = is_published===0?'Published':'Unpublished';
        Inertia.post(route('teacher.courses.chapters.update',{course_id,id}),{
            is_published:is_published===0?1:0
        },{
            onSuccess:()=>toast.success(`Chapter ${label}`),
            onError:e=>{
                toast.error('Something   Went Wrong. Please Try again!');
                console.error(e);
            },
        });
    }

    const onDelete = () =>{
        Inertia.post(route('teacher.courses.chapters.destroy',{course_id,id}),{},{
            onSuccess:()=>toast.success('Chapter Deleted!'),
            onError:e=>{
                toast.error('Something   Went Wrong. Please Try again!');
                console.error(e);
            },
        });
    }

    return (
        <div className='flex items-center gap-x-2'>
            <Button size='sm'  onClick={onTogglePublish} disabled={!isComplete} variant='outline'>{`${chapter.is_published===1?'Unpublish':'Publish'}`}</Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button size='sm' variant='destructive'><Trash className='h-4 w-4' /></Button>
            </ConfirmModal>
        </div>
    )
}

export default ChapterActions