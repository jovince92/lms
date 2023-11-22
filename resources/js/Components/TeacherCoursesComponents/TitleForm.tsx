import { Course } from '@/types'
import React, { FC, FormEventHandler, useState } from 'react'
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';
import { useForm } from '@inertiajs/inertia-react';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { Textarea } from '../ui/textarea';

interface Props{
    course:Course;
}

const TitleForm:FC<Props> = ({course}) => {
    const {title,id} = course;
    const [editing,setEditing] = useState(false);
    const toggleEdit = () =>setEditing(current=>!current);
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('teacher.courses.update',{id}),{
            onSuccess:()=>{
                toast.success('Course Updated!');
                setEditing(false);
            },
            onError:()=>toast.error('Something   Went Wrong. Please Try again!')
        })
    }
    const {data,setData,post,processing,errors} = useForm({title})
    return (
        <div className='mt-5 border bg-secondary rounded-md p-3.5'>
            <div className='font-medium flex items-center justify-between'>
                <p>Course Title <span className='text-destructive text-[0.75rem] italic font-extralight'>*required</span></p>
                
                <Button onClick={toggleEdit} variant='ghost'>
                    {editing ? <>Cancel</>: <><Pencil className='w-4 h-4 mx-2' />Edit Title</>}
                </Button>
            </div>
            {
                !editing && <p className='text-sm mt-1.5'>{title}</p>
            }
            {
                editing &&(
                    <form onSubmit={onSubmit} className='flex flex-col space-y-3.5 mt-3.5'>
                        <div className='flex flex-col  space-y-1.5'>
                            <Input required value={data.title}  onChange={({target})=>setData('title',target.value)} disabled={processing} autoFocus autoComplete='off' />
                            <Button size='sm' className='ml-auto' disabled={processing} type='submit'>Save</Button>
                        </div>
                        
                    </form>
                )
            }
        </div>
    )
}

export default TitleForm