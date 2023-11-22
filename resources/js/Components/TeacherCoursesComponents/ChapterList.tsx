import { Chapter } from '@/types';
import React, { FC } from 'react'

import {DragDropContext,Droppable,Draggable,DropResult} from '@hello-pangea/dnd';
import { cn } from '@/lib/utils';
import { Grip } from 'lucide-react';
import { Badge } from '../ui/badge';

interface Props{
    onEdit:()=>void;
    onReorder:()=>void;
    chapters:Chapter[];
}

const ChapterList:FC<Props> = ({onEdit,onReorder,chapters}) => {
    return (
        <DragDropContext onDragEnd={(e)=>console.log(e)}>
            <Droppable droppableId='chapters'>
                {
                    provided=>(
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {
                                chapters.map((chapter,index)=>(
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
                                                        <Badge className={cn('bg-secondary text-primary ',
                                                                chapter.is_published===1 && 'bg-sky-700 text-white'
                                                            )}>
                                                            {chapter.is_published===1?'Published':'Draft'}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </Draggable>
                                ))
                            }
                        </div>
                    )
                }
            </Droppable>
        </DragDropContext>
    )
}

export default ChapterList