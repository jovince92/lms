import { Course } from '@/types'
import { useForm } from '@inertiajs/inertia-react';
import React, { FC, FormEventHandler, useState } from 'react'
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';

interface Props{
    course:Course;
}

const DescriptionForm:FC<Props> = ({course}) => {
    const {description,id} = course;
    const [editing,setEditing] = useState(false);
    const toggleEdit = () =>setEditing(current=>!current);
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('teacher.courses.update',{id}),{
            onSuccess:()=>{
                toast.success('Course Updated!')
                setEditing(false);
            },
            onError:()=>toast.error('Something   Went Wrong. Please Try again!')
        })
    }
    const {data,setData,post,processing,errors} = useForm({description})
    return (
        <div className='mt-5 border bg-secondary rounded-md p-3.5'>
            <div className='font-medium flex items-center justify-between'>
                <p>Course Description <span className='text-destructive text-[0.75rem] italic font-extralight'>*required</span></p>
                
                <Button onClick={toggleEdit} variant='ghost'>
                    {editing ? <>Cancel</>: <><Pencil className='w-4 h-4 mx-2' />Edit Description</>}
                </Button>
            </div>
            {
                !editing && <p className={cn('text-sm mt-2',!description && 'text-muted-foreground italic')}>{description || "No Description..."}</p>
            }
            {
                editing &&(
                    <form onSubmit={onSubmit} className='flex flex-col space-y-3.5 mt-3.5'>
                        <div className='flex   items-center    space-x-1.5'>
                            <Textarea placeholder='e.g. This  course is about....'  required value={data.description}  onChange={({target})=>setData('description',target.value)} disabled={processing} autoFocus autoComplete='off' />
                            <Button variant='ddc' size='sm' disabled={processing} type='submit'>Save</Button>
                        </div>
                        
                    </form>
                )
            }
        </div>
    )
}

export default DescriptionForm