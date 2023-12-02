import { Course, PageProps, Progress } from '@/types'
import  { FC, useMemo } from 'react'
import IconBadge from './IconBadge';
import { BookOpen, Heart, HeartOff, MoreVerticalIcon, Search } from 'lucide-react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { Inertia, Page } from '@inertiajs/inertia';
import CourseProgressBar from '@/Pages/CourseProgressBar';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger,PopoverClose } from './ui/popover';
import { toast } from 'sonner';

interface Props{
    course:Course;
}

const CourseCard:FC<Props> = ({course}) => {
    
    const {my_progress} = usePage<Page<PageProps>>().props;
    const {image,title,category,chapters,id,user_id}=course;
    const hasStartedCourse = useMemo(()=>my_progress.findIndex(progress=>progress.chapter.course_id===id)>-1,[id]);
    
    const {my_favorites} = usePage<Page<PageProps>>().props;
    const isFavorited = useMemo(()=>my_favorites.findIndex(fave=>fave.id===id)>-1,[my_favorites,id]);

    const addToFavorites = () =>{
        Inertia.post(route('favorites.store'),{
            course_id:id
        },{
            onSuccess:()=>toast.success(!isFavorited?'Course Added To Favorites':'Course Removed From Favorites'),
            onError:()=>toast.error('Something went wrong. Please try again')
        });
    }

    const removeFromFavorites = () =>{
        Inertia.post(route('favorites.destroy'),{
            course_id:id
        },{
            onSuccess:()=>toast.success('Course Added To Favorites'),
            onError:()=>toast.error('Something went wrong. Please try again')
        });
    }

    const searchByUser = () => Inertia.get(route('search.index',{user_id}));

    
    return (
        <div className='h-fit' >
            <div className='group hover:shadow-sm transition overflow-hidden border rounded-lg p-2.5 h-full relative'>
                <Link  href={route('search.course',{id})} className='relative w-full aspect-video rounded-md overflow-hidden inline-flex '>
                    <img src={image} className='h-full w-full object-cover' alt='Title' />
                </Link>
                <div className='flex'>
                    <Link href={route('search.course',{id})} className='flex flex-col pt-2 w-11/12 '>
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
                    </Link>
                    
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className='mt-1 ml-auto rounded-full' variant='ghost' size='icon'>
                                <MoreVerticalIcon size={24} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='z-50 w-auto flex flex-col space-y-1 p-1'>
                            {!isFavorited? <PopoverClose> <div className='w-full font-medium flex items-center justify-start p-1 text-sm hover:bg-secondary transition rounded-md' onClick={addToFavorites}><Heart className='h-4 w-4 mr-2' />Add to Favorites</div></PopoverClose>: <PopoverClose> <div className='w-full font-medium flex items-center justify-start p-1 text-sm hover:bg-secondary transition rounded-md' onClick={removeFromFavorites} ><HeartOff className='h-4 w-4 mr-2' />Remove From Favorites</div></PopoverClose>}
                            <PopoverClose> <div className='w-full font-medium flex items-center justify-start p-1 text-sm hover:bg-secondary transition rounded-md' onClick={searchByUser}><Search className='h-4 w-4 mr-2' />Courses By This Instructor</div></PopoverClose>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default CourseCard;
