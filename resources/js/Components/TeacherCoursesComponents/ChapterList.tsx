import { Chapter } from '@/types';
import React, { FC, useState } from 'react'

import {DragDropContext,Droppable,Draggable,DropResult, OnDragEndResponder} from '@hello-pangea/dnd';
import { cn } from '@/lib/utils';
import { Grip, Pencil } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Inertia } from '@inertiajs/inertia';

interface Props{
    onReorder:(data:{id:number;position:number}[])=>void;
    chapters:Chapter[];
}

const ChapterList:FC<Props> = ({onReorder,chapters}) => {
    const [draggableChapters,setDraggableChapters] = useState(chapters);

    const onDragEnd:OnDragEndResponder  = (e) =>{
        if(!e.destination) return;
        const items  = Array.from(draggableChapters);
        const [reorderedItem] = items.splice(e.source.index,1);
        items.splice(e.destination.index,0,reorderedItem);

        const startIndex = Math.min(e.source.index,e.destination.index);
        const endIndex = Math.max(e.source.index,e.destination.index);

        const updatedChapters = items.slice(startIndex,(endIndex+1));
        setDraggableChapters(items);

        const bulkUpdateData  =updatedChapters.map(({id})=>({id,position:(items.findIndex(item=>item.id===id)+1)}))
        onReorder(bulkUpdateData);
    }

    const onEdit = (course_id:number,id:number) => Inertia.get(route('teacher.courses.chapters.show',{course_id,id}));

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='chapters'>
                {
                    provided=>(
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {
                                draggableChapters.map((chapter,index)=>(
                                    <Draggable key={chapter.id} draggableId={chapter.id.toString()} index={index}>
                                        {
                                            provided=>(
                                                <div {...provided.draggableProps} ref={provided.innerRef} className={cn('flex items-center gap-x-2 bg-neutral-200 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-primary rounded-md mb-3.5 text-sm',
                                                        chapter.is_published===1 && 'bg-sky-200 dark:bg-sky-900 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300'
                                                    )}>
                                                    <div {...provided.dragHandleProps} className={cn('text-primary px-2 py-3 border-r border--r-primary hover:bg-secondary rounded-l-md transition duration-300',
                                                            chapter.is_published===1 && "border-r-sky-200 dark:border-r-sky-800 hover:bg-sky-200 dark:hover:bg-sky-800"
                                                        )} >
                                                        <Grip className='h-5 w-5' />
                                                    </div>
                                                    {chapter.title}
                                                    <div className='ml-auto pr-2 flex items-center gap-x-1.5'>
                                                        <Badge className={cn('bg-secondary text-primary pointer-events-none ',
                                                                chapter.is_published===1 && 'bg-sky-700 text-white'
                                                            )}>
                                                            {chapter.is_published===1?'Published':'Draft'}
                                                        </Badge>
                                                        <button onClick={()=>onEdit(chapter.course_id,chapter.id)} className='p-3 hover:opacity-70 transition duration-300'>
                                                            <Pencil className='w-4 h-4' />
                                                        </button>
                                                    </div>
                                                    
                                                </div>
                                            )
                                        }
                                    </Draggable>
                                ))
                                
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </DragDropContext>
    )
}

export default ChapterList