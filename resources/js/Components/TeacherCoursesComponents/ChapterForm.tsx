import { Course } from '@/types';
import React, { FC, FormEventHandler, useState } from 'react'
import { Button } from '../ui/button';
import { Loader2, Pencil, PlusCircle } from 'lucide-react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import ChapterList from './ChapterList';


interface Props{
    course:Course;
}

const ChapterForm:FC<Props> = ({course}) => {
    const {chapters,id} = course;
    const [creating,setCreating] = useState(false);
    const toggleCreating = () =>setCreating(current=>!current);
    const [loading,setLoading]  = useState(false);

    const {data,setData,processing,post,errors} = useForm({title:""});

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('teacher.courses.chapters.store',{course_id:id}),{
            onSuccess:()=>{
                toast.success('Chapter Created!');
                setCreating(false);
            },
            onError:()=>toast.error('Something   Went Wrong. Please Try again!'),
            preserveState:false
        });
    }

    const onReorder = (reordered_chapters:{id:number;position:number}[]) =>{
        
        Inertia.post(route('teacher.courses.chapters.reorder',{course_id:id}),{
            //@ts-ignore
            reordered_chapters
        },{
            onStart:()=>setLoading(true),
            onSuccess:()=>toast.success('Chapters Reordered!'),
            onError:()=>toast.error('Something   Went Wrong. Please Try again!'),
            onFinish:()=>setLoading(false)
        });
    }

    return (
        <div className='relative mt-5 border bg-secondary rounded-md p-3.5'>
            {
                loading && <div className='absolute inset-0 h-full w-full bg-black/30 p-4 flex items-center justify-center'> <Loader2 className='animate-spin h-7 w-7 text-sky-500' /></div>
            }
            <div className='font-medium flex items-center justify-between'>
                <p>Course Chapters <span className='text-destructive text-[0.75rem] italic font-extralight'>*required</span></p>
                
                <Button onClick={toggleCreating} variant='ghost'>
                    {creating ? <>Cancel</>: <><PlusCircle className='w-4 h-4 mx-2' />Add a Chapter</>}
                </Button>
                
                
            </div>
            {
                creating &&(
                    <form onSubmit={onSubmit} className='flex flex-col space-y-3.5 mt-3.5'>
                        <div className='flex flex-col  space-y-1.5'>
                            <Input required value={data.title} placeholder='e.g. Introduction to Microsoft Office' onChange={({target})=>setData('title',target.value)} disabled={processing} autoFocus autoComplete='off' />
                            <Button size='sm' className='ml-auto' variant='ddc' disabled={processing} type='submit'>Create</Button>
                        </div>
                        
                    </form>
                )
            }
            {
                !creating && course.chapters.length<1 && (
                    <div className={cn('text-sm mt-2',
                            course.chapters.length<1&&'italic text-primary/75'
                        )}>
                        No Chapters
                    </div>
                )
            }
            <ChapterList onReorder={onReorder} chapters={chapters} />
            {
                !creating && <p className='text-xs text-muted-foreground mt-3.5'>Drag and drop to reorder the chapters</p>
            }
        </div>
    )
}

export default ChapterForm