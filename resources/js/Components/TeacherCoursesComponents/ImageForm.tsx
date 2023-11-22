import { Course } from '@/types'
import { useForm } from '@inertiajs/inertia-react';
import React, { FC, FormEventHandler, useMemo, useState } from 'react'
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SingleImageDropzone } from '../SingeImageDropZone';
import { Inertia } from '@inertiajs/inertia';

interface Props{
    course:Course;
}

const ImageForm:FC<Props> = ({course}) => {
    const {id} = course;
    const [editing,setEditing] = useState(false);
    const [image,setImage] = useState<File>();
    const [loading,setLoading] = useState(false);
    const toggleEdit = () =>setEditing(current=>!current);
    
    

    const onChange = (file?:File) =>{
        if(!file) return;
        Inertia.post(route('teacher.courses.update',{id}),{image:file},{
            onStart:()=>setLoading(true),
            onSuccess:()=>{
                toast.success('Course Image Updated!')
                setEditing(false);
            },
            onError:e=>{
                toast.error('Something   Went Wrong. Please Try again!');
                console.error(e);
            },
            onFinish:()=>setLoading(false),
            preserveScroll:true
        });
    }

    const label = useMemo(()=>!course.image ?<><PlusCircle className='h-4 w-4 mr-2' />Add an Image</>:<><Pencil className='w-4 h-4 mx-2' />Edit Image</>,[course.image,editing]);

    return (
        <div className='mt-5 border bg-secondary rounded-md p-3.5'>
            <div className='font-medium flex items-center justify-between'>
                <p>Course Image<span className='text-destructive text-[0.75rem] italic font-extralight'>*required</span></p>
                <Button onClick={toggleEdit} variant='ghost'>
                    {editing ? <>Cancel</>: label}
                </Button>
            </div>
            {
                !editing && (
                    !course.image? (
                        <div className='flex items-center justify-center h-60 bg-muted-foreground/20 rounded-md'>
                            <ImageIcon className='h-10 w-10' />
                        </div>
                    ):(
                        <div className='relative aspect-video mt-2'>
                            <img src={course.image} alt='Image' className='h-full w-full object-cover rounded-md' />
                        </div>
                    )
                )
            }
            {
                editing&&(
                    <div>
                        <SingleImageDropzone className='w-full' disabled={loading} value={image} onChange={onChange} />
                    </div>
                )
            }
        </div>
    )
}

export default ImageForm