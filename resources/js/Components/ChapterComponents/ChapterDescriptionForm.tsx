import { Chapter } from '@/types'
import { useForm } from '@inertiajs/inertia-react';
import {FC, FormEventHandler, useState} from 'react'
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import Editor from '@/Pages/Editor';

interface Props{
    chapter:Chapter;
}

const ChapterDescriptionForm:FC<Props> = ({chapter}) => {
    const {description,id,course_id} = chapter;
    const [editing,setEditing] = useState(false);
    const toggleEdit = () =>setEditing(current=>!current);
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('teacher.courses.chapters.update',{course_id,id}),{
            onSuccess:()=>{
                toast.success('Chapter Description Changed!');
                setEditing(false);
            },
            onError:()=>toast.error('Something   Went Wrong. Please Try again!')
        })
    }
    const {data,setData,post,processing,errors} = useForm({description})
    return (
        <div className='mt-5 border bg-secondary rounded-md p-3.5'>
            <div className='font-medium flex items-center justify-between'>
                <p>Chapter Description <span className='text-destructive text-[0.75rem] italic font-extralight'>*required</span></p>
                
                <Button onClick={toggleEdit} variant='ghost'>
                    {editing ? <>Cancel</>: <><Pencil className='w-4 h-4 mx-2' />Edit Description</>}
                </Button>
            </div>
            {
                !editing && <div className={cn('text-sm mt-2',!description && 'text-muted-foreground italic')}>{!!description?<Editor value={data.description||""} readonly /> : "No Description..."}</div>
            }
            {
                editing &&(
                    <form onSubmit={onSubmit} className='flex flex-col space-y-3.5 mt-3.5'>
                        <div className='flex  flex-col   space-y-1.5'>
                            <Editor value={data.description||""} onChange={val=>setData('description',val)} />
                            <Button className='ml-auto' variant='ddc' size='sm' disabled={processing} type='submit'>Save</Button>
                        </div>
                        
                    </form>
                )
            }
        </div>
    )
}

export default ChapterDescriptionForm