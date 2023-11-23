import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Inertia } from '@inertiajs/inertia';
import { Link, useForm } from '@inertiajs/inertia-react';
import React, { FormEventHandler } from 'react'
import { toast } from 'sonner';

const TeacherCoursesCreate = () => {

    const {data,setData,processing,errors,post} = useForm({title:""});
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('teacher.courses.store'),{
            onSuccess:()=>toast.success('Course Created!'),
            onError:()=>toast.error('Something went wrong. Please Try Again.')
        })
    }

    return (
        <DashboardLayout>
            <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-5'>
                <div>
                    <h1 className='text-2xl'>Name Your Course!</h1>
                    <p className='text-sm text-muted-foreground'>
                        What would you like to name your course? Don&apos;t worry, you can change this later...
                    </p>
                    <form onSubmit={onSubmit} className='flex flex-col space-y-7 mt-7'>
                        <div className='flex flex-col space-y-1'>
                            <Label htmlFor='title'>Course Title</Label>
                            <Input placeholder="e.g. 'Web Design From Zero to Hero'" value={data.title} onChange={({target})=>setData('title',target.value)} required disabled={processing} autoComplete='off' autoFocus id='title' />
                            <p className='text-muted-foreground text-xs'>What will you teach in this course?</p>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <Button onClick={()=>Inertia.get(route('teacher.courses.index'))} disabled={processing} type='button' variant='secondary'>Cancel</Button>
                            <Button variant='ddc' disabled={processing} type='submit' >Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default TeacherCoursesCreate