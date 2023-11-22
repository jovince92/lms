import { Category, Course, PageProps } from '@/types';
import { Inertia, Page } from '@inertiajs/inertia';
import { useForm, usePage } from '@inertiajs/inertia-react';
import React, { FC, FormEventHandler, useState } from 'react'
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import ComboBox from '../ui/ComboBox';

interface Props{
    course:Course;
}

const CategoryForm:FC<Props> = ({course}) => {
    const {categories} = usePage<Page<PageProps>>().props;
    const {category_id,id,category} = course;
    const [editing,setEditing] = useState(false);
    const toggleEdit = () =>setEditing(current=>!current);
    const {data,setData,post,processing,errors} = useForm({category_id:category_id||0});


    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        if(data.category_id===0) return;
        post(route('teacher.courses.update',{id}),{
            onSuccess:()=>{
                toast.success('Course Category Updated!')
                setEditing(false);
            },
            onError:()=>toast.error('Something   Went Wrong. Please Try again!')
        })
    }

    return (
        <div className='mt-5 border bg-secondary rounded-md p-3.5'>
            <div className='font-medium flex items-center justify-between'>
                <p>Course Category <span className='text-destructive text-[0.75rem] italic font-extralight'>*required</span></p>
                
                <Button onClick={toggleEdit} variant='ghost'>
                    {editing ? <>Cancel</>: <><Pencil className='w-4 h-4 mx-2' />Edit Category</>}
                </Button>
            </div>
            {
                !editing && <p className={cn('text-sm mt-2',!category_id && 'text-muted-foreground italic')}>{category?.category || "No Category Set..."}</p>
            }
            {
                editing &&(
                    <form onSubmit={onSubmit} className='flex flex-col space-y-3.5 mt-3.5'>
                        <div className='flex   items-center    space-x-1.5'>
                            <ComboBox value={data.category_id} onChange={(val)=>setData('category_id',val)} options={categories.map(({id,category})=>({value:id,label:category}))} />
                            <Button size='sm' disabled={processing} type='submit'>Save</Button>
                        </div>
                        
                    </form>
                )
            }
        </div>
    )
}

export default CategoryForm