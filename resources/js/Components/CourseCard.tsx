import { Course } from '@/types'
import  { FC } from 'react'
import IconBadge from './IconBadge';
import { BookOpen } from 'lucide-react';
import { Link } from '@inertiajs/inertia-react';

interface Props{
    course:Course;
}

const CourseCard:FC<Props> = ({course}) => {
    const {image,title,category,chapters,id}=course;
    return (
        <Link href={route('course.index',{id})}>
            <div className='group hover:shadow-sm transition overflow-hidden border rounded-lg p-2.5 h-full'>
                <div className='relative w-full aspect-video rounded-md overflow-hidden'>
                    <img src={image} className='h-full w-full object-cover' alt='Title' />
                </div>
                <div className='flex flex-col pt-2'>
                    <div className='text-lg md:text-base font-medium group-hover:text-idcsi transition duration-300   line-clamp-2'>{title}</div>
                    <p className='text-sm text-muted-foreground'>{category.category}</p>
                    <div  className='my-2.5 flex items-center gap-x-2 text-sm md:text-xs'>
                        <div className='flex items-center gap-x-1 text-primary/80'>
                            <IconBadge size='sm' Icon={BookOpen} />
                            <span>{`${chapters.length} ${chapters.length===1?'Chapter':'Chapters'}`}</span>
                        </div>
                    </div>
                    <div  className='mt-auto'>
                        {/* TODO: Progress Component */}
                        <p className='text-base md:text-sm font-medium text-muted-foreground'>Course not Started</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CourseCard