import { Course, PageProps, Progress } from '@/types'
import  { FC, useMemo } from 'react'
import IconBadge from './IconBadge';
import { BookOpen } from 'lucide-react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { Page } from '@inertiajs/inertia';
import { Progress as ProgressBar } from './ui/progress';
import { cn } from '@/lib/utils';
import CourseProgressBar from '@/Pages/CourseProgressBar';

interface Props{
    course:Course;
}

const CourseCard:FC<Props> = ({course}) => {
    
    const {my_progress} = usePage<Page<PageProps>>().props;
    const {image,title,category,chapters,id}=course;
    const hasStartedCourse = useMemo(()=>my_progress.findIndex(progress=>progress.chapter.course_id===id)>-1,[id])
    

    // const ownCourse = user.id===course.user_id;
    // const courseRoute = ownCourse?'#':route('search.chapter',{id});
    return (
        <Link href={route('search.course',{id})} >
            <div className='group hover:shadow-sm transition overflow-hidden border rounded-lg p-2.5 h-full'>
                <div className='relative w-full aspect-video rounded-md overflow-hidden'>
                    <img src={image} className='h-full w-full object-cover' alt='Title' />
                </div>
                <div className='flex flex-col pt-2'>
                    <div className='text-lg md:text-base font-medium group-hover:text-idcsi transition duration-300   line-clamp-1'>{title}</div>
                    <p className='text-sm text-muted-foreground'>{category.category}</p>
                    <p className='text-xs text-primary/80 font-medium'>{`By: ${course.user.first_name+' '+course.user.last_name}`}</p>
                    <div  className='my-2.5 flex items-center gap-x-2 text-sm md:text-xs'>
                        <div className='flex items-center gap-x-1 text-primary/80'>
                            <IconBadge size='sm' Icon={BookOpen} />
                            <span>{`${chapters.length} ${chapters.length===1?'Chapter':'Chapters'}`}</span>
                        </div>
                    </div>
                    <div  className='mt-auto'>
                        {hasStartedCourse?<CourseProgressBar className='h-2'  course={course}  />:<p className='text-base md:text-sm font-medium text-muted-foreground'>Course not Started</p>}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CourseCard;