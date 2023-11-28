import { Course } from '@/types'
import { Inertia } from '@inertiajs/inertia';
import React, { FC, useMemo } from 'react'
import { toast } from 'sonner';
import { Button } from '../ui/button';
import ConfirmModal from '../Modals/ConfirmModal';
import { Trash } from 'lucide-react';
import { useConfettiStore } from '@/Hooks/useConfettiStore';

interface Props{
    course:Course;
}

const CourseActions:FC<Props> = ({course}) => {
    
    const {onOpen} = useConfettiStore();
    const {id,is_published} = course;
    const isComplete = useMemo(()=>{
        if(!course.title||course.title?.length<0) return false;
        if(!course.description||course.description?.length<0) return false;
        if(!course.language_id||!course.language) return false;
        if(!course.image||course.image?.length<0) return false;
        if(!course.category_id||!course.category) return false;
        if(!course.chapters.some(chapter=>chapter.is_published===1)) return false;
        return true;
    },[course]);

    const onTogglePublish = () =>{
        const label = is_published===0?'Published':'Unpublished';
        Inertia.post(route('teacher.courses.update',{id}),{
            is_published:is_published===0?1:0
        },{
            onSuccess:()=>{
                toast.success(`Course ${label}`);
                if(is_published===0)onOpen();
            },
            onError:e=>{
                toast.error('Something   Went Wrong. Please Try again!');
                console.error(e);
            },
        });
    }

    const onDelete = () =>{
        Inertia.post(route('teacher.courses.destroy',{id}),{},{
            onSuccess:()=>toast.success('Course Deleted!'),
            onError:e=>{
                toast.error('Something   Went Wrong. Please Try again!');
                console.error(e);
            },
        });
    }
    return (
        <div className='flex items-center gap-x-2'>
            <Button size='sm'  onClick={onTogglePublish} disabled={!isComplete} variant='outline'>{`${course.is_published===1?'Unpublish':'Publish'}`}</Button>
            <ConfirmModal label='This will delete all Attachments and Chapters. Proceed?' onConfirm={onDelete}>
                <Button size='sm' variant='destructive'><Trash className='h-4 w-4' /></Button>
            </ConfirmModal>
        </div>
    )
}

export default CourseActions