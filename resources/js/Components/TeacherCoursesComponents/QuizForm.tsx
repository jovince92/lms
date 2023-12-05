import { Course } from '@/types';
import { useForm } from '@inertiajs/inertia-react';
import React, { FC, FormEventHandler, useState } from 'react'
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Pencil, Plus, PlusCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { Inertia } from '@inertiajs/inertia';


interface Props{
    course:Course;
}

const QuizForm:FC<Props> = ({course}) => {
    
    const {id,quiz} = course;
    const [creating,setCreating] = useState(false);
    const toggleCreating = () =>setCreating(current=>!current);
    const [loading,setLoading]  = useState(false);

    const {data,setData,processing,post,errors} = useForm({
        name:quiz?.name||""
    });

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('teacher.courses.quiz.store',{course_id:id}),{
            onSuccess:()=>{
                toast.success('Quiz Created!');
                setCreating(false);
            },
            onError:()=>toast.error('Something   Went Wrong. Please Try again!'),
            preserveState:false
        });
    }
    
    const onEdit = () => Inertia.get(route('teacher.courses.quiz.show',{course_id:id,id:quiz!.id}));

    return (
        <div className='mt-5 border bg-secondary rounded-md p-3.5'>
            <div className='font-medium flex items-center justify-between'>
                <p>Course Quiz</p>
                {!quiz &&
                    <Button onClick={()=>setCreating(true)} variant='ghost'>
                        <PlusCircle className='w-4 h-4 mx-2' />Add Quiz
                    </Button>
                }
            </div>
            {!quiz && <p className='text-sm mt-2 text-primary/80 italic'>This Course Has No Quiz</p>}
            {
                creating &&(
                    <form onSubmit={onSubmit} className='flex flex-col space-y-3.5 mt-3.5'>
                        <div className='flex flex-col  space-y-1.5'>
                            <Input required value={data.name} placeholder='e.g. Course Assessment' onChange={({target})=>setData('name',target.value)} disabled={processing} autoFocus autoComplete='off' />
                            <div className='ml-auto flex items-center space-x-2'>
                                <Button onClick={()=>setCreating(false)} size='sm' variant='outline' disabled={processing} type='button'>Cancel</Button>
                                <Button size='sm'  variant='ddc' disabled={processing} type='submit'>Create</Button>
                            </div>
                        </div>
                        
                    </form>
                )
            }
            {
                !!quiz&&(
                    <div className={cn('flex items-center gap-x-2 bg-neutral-200 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-primary rounded-md mb-3.5 text-sm',
                            quiz.is_published===1 && 'bg-sky-200 dark:bg-sky-900 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300'
                        )}>
                        
                        <span className='mx-3.5 font-medium'>{quiz.name}</span>
                        <div className='ml-auto pr-2 flex items-center gap-x-1.5'>
                            <Badge className={cn('bg-secondary text-primary pointer-events-none ',
                                    quiz.is_published===1 && 'bg-sky-700 text-white'
                                )}>
                                {quiz.is_published===1?'Published':'Draft'}
                            </Badge>
                            <button onClick={onEdit} className='p-3 hover:opacity-70 transition duration-300'>
                                <Pencil className='w-4 h-4' />
                            </button>
                        </div>
                        
                    </div>
                )
            }
        </div>
    )
}

export default QuizForm