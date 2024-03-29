import { IconMap } from '@/Components/SearchPageComponents/Categories';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Chapter, Course, PageProps, Progress } from '@/types'
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { format } from 'date-fns';
import { BadgeInfo, BookOpen, FileIcon, Globe, ListChecks, MessageSquare, SmilePlus, StarsIcon, Timer } from 'lucide-react';
import React, { FC, ReactNode, useCallback, useMemo } from 'react'
import Editor from './Editor';
import { Inertia, Page } from '@inertiajs/inertia';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import CourseProgressBar from './CourseProgressBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { toast } from 'sonner';

import StarRatings from 'react-star-ratings';
import { useRatingModal } from '@/Hooks/useRatingModal';
import { useUserFeedBackModal } from '@/Hooks/useUserFeedBackModal';
import { Separator } from '@/Components/ui/separator';

interface Props{
    course:Course;
}

const StudentCourse:FC<Props> = ({course}) => {
    const {my_progress} = usePage<Page<PageProps>>().props;
    const {category,title,description,user : creator,created_at,language,chapters,attachments,id,user_id,user,quiz} = course;
    const {onOpen} = useRatingModal();
    const {onOpen : OpenFeedback} = useUserFeedBackModal();
    const totalSecords = chapters.reduce((accumulator=0, currentValue)=>accumulator+convertTimeToSeconds(currentValue.duration),0);
    const Icon = IconMap[category.icon_map_number];

    const hasStartedCourse = useMemo(()=>my_progress.findIndex(progress=>progress.chapter.course_id===id)>-1,[id]);
    const onStart = useCallback(() =>{
        const completedIds = my_progress.filter(progress=>progress.is_completed===1&&progress.chapter.course_id===id).map(progress=>(progress.chapter_id));
        const nonCompletedIds = chapters.filter(chapter=> !completedIds.includes(chapter.id)).map(chapter=>(chapter.id));

        Inertia.get(route('course.chapter',{course_id:id,id:nonCompletedIds[0]||chapters[0].id}));

    },[my_progress,chapters,id]);
    const courseProgress = useMemo(()=>my_progress.filter(progress=>progress.chapter.course_id===id),[id,my_progress]);
    const completedChapters = courseProgress.length>0?courseProgress.reduce((accumulator=0, currentValue)=>accumulator+(currentValue.is_completed===1?1:0),0):0;

    const hasQuiz = useMemo(()=>quiz && quiz.quiz_questions.length>5,[quiz]);


    const takeQuiz = () =>{
        if(completedChapters<course.chapters.length) return toast.info('You Need To Finish The Course Before Taking The Quiz');
        Inertia.get(route('course.quiz.index',{course_id:id}));
    }


    const averageRating = useMemo(()=>{
        if(!course.course_ratings) return 0;
        if(course.course_ratings.length===0) return 0;
        const totalRating = course.course_ratings.reduce((acc,rating)=>acc+rating.rating,0);
        return totalRating/course.course_ratings.length;
    },[course]);

    

    return (
        <>
            <Head title={course.title} />
            <DashboardLayout >
                <div className='h-full w-full flex flex-col space-y-2 overflow-y-auto md:flex-row md:space-y-0 md:space-x-2 md:overflow-y-hidden relative'>                
                    <div className='md:h-full w-full md:w-1/2 flex flex-col gap-y-3.5 p-3.5 md:overflow-y-auto'>
                        <Link href={route('search.index',{catIds:category.id})}>
                            <p className='font-semibold text-primary/90 flex items-center space-x-1.5'> <Icon  size={20} /> <span>{category.category}</span></p>
                        </Link>
                        <div className='flex flex-col space-y-1'>
                            <h1 className='text-2xl font-bold tracking-wide text-primary'>{title}</h1>
                            <p className='text-primary/80'>{description}</p>
                        </div>
                        <div className='tracking-tight flex items-center space-x-1'>
                            <span>Created By:</span> 
                            <Link href={route('search.index',{user_id})}>
                                <Button variant='link' size='sm'>
                                    <Avatar className="h-10 w-10 border border-idcsi mr-1">
                                        <AvatarImage src={user.photo} alt="Photo" />
                                        <AvatarFallback>{`${user.first_name.charAt(0)+user.last_name.charAt(0)}`}</AvatarFallback>
                                    </Avatar>
                                    <span className='text-lg capitalize font-semibold'>{creator.first_name}&nbsp;{creator.last_name}</span>
                                </Button>
                                

                            </Link>
                        </div>
                        <div className='text-muted-foreground flex flex-col space-y-1'>
                            <p className='flex items-center'><BadgeInfo className='h-4 w-4 mr-2' /> <span className='text-sm'>Last Updated On: {format(new Date(created_at),'Pp')}</span></p>
                            <p className='flex items-center'> <Globe className='h-4 w-4 mr-2'/> <span>{language?.name}</span> </p>
                        </div>
                        <div className='text-muted-foreground flex flex-col space-y-1'>
                            <p className='flex items-center'><BookOpen className='h-4 w-4 mr-2' /> <span className='text-sm'>{chapters.length} Chapters</span></p>
                            <p className='flex items-center'> <Timer className='h-4 w-4 mr-2'/> <span>{tohhmmss(totalSecords)} Total Duration</span> </p>
                        </div>
                        <p className='text-muted-foreground flex items-center'>
                            <FileIcon className='h-4 w-4 mr-2' />
                            <span>
                                {`${attachments.length.toString()} Attachment${attachments.length===1?'':'s'}`} 
                            </span>
                        </p>
                        <p className='text-muted-foreground flex items-center'>
                            <ListChecks className='h-4 w-4 mr-2' />
                            <span>
                                {!hasQuiz?'No Quiz for this Course': quiz!.quiz_questions.length.toString()+ ' Questions Short Quiz'} 
                            </span>
                        </p>
                        <Separator />
                        <div className='text-muted-foreground flex items-center space-x-2'>
                            <StarsIcon className='h-4 w-4 ' />
                            <p>Average Rating:</p>
                            
                            <StarRatings
                                
                                rating={averageRating}
                                starRatedColor="yellow"
                                numberOfStars={5}
                                name='rating'
                                starDimension='15px'
                                starSpacing='1px'
                                />
                        </div>
                        <div className='text-muted-foreground flex items-center space-x-2'>
                            <MessageSquare className='h-4 w-4' />
                            <button onClick={()=>onOpen(course)} className='hover:underline hover:opacity-75 transition duration-300' >
                                <p>Click here to Give Rating and Feedback</p>
                            </button>
                        </div>
                        <div className='text-muted-foreground flex items-center space-x-2'>
                            <SmilePlus className='h-4 w-4' />
                            <button onClick={()=>OpenFeedback(course)} className='hover:underline hover:opacity-75 transition duration-300' >
                                <p>Click here to View Course Feedbacks by Students</p>
                            </button>
                        </div>
                        <div className='text-sm'>
                            <p>Your Progress: {completedChapters}/{course.chapters.length}</p>
                            {hasStartedCourse?<CourseProgressBar className='h-3' course={course}  />:<p className='text-base md:text-sm font-medium text-muted-foreground'>Course not Started</p>}
                                
                        </div>
                        <Button onClick={onStart} className=' absolute top-3 right-3 md:static md:mr-auto' variant='ddc'>{`${hasStartedCourse?'Continue Course':'Start this Course'}`}</Button>
                        {
                            hasQuiz && <Button onClick={takeQuiz} className=' absolute top-3 right-3 md:static md:mr-auto' variant='outline'>Take Short Quiz</Button>
                        }
                    </div>
                    <div className='md:h-full w-full md:w-1/2 flex flex-col gap-y-3.5 p-3.5 md:overflow-y-auto'>
                        <h1 className='text-2xl font-bold tracking-wide text-primary'>Course Contents</h1>
                        <Accordion type="single" collapsible className="w-full">
                            {
                                chapters.map(chapter=>(
                                    <CourseAccordionItem key={chapter.id} chapter={chapter} > 
                                        {chapter.title}
                                    </CourseAccordionItem>
                                ))
                            }
                        </Accordion>
                    </div>
                </div>
                
            </DashboardLayout>
        </>
    )
}

export default StudentCourse;


interface CourseAccordionItemProps{
    chapter:Chapter;
    children:ReactNode
}

const CourseAccordionItem:FC<CourseAccordionItemProps> = ({chapter,children}) =>{
    
    const {my_progress} = usePage<Page<PageProps>>().props;
    const {id,duration,description}= chapter;

    const isCompleted = my_progress.find(progress=>progress.chapter.id===chapter.id)?.is_completed===1;

    return(
        <AccordionItem value={id.toString()}>
            <AccordionTrigger>
                <div className='flex items-center justify-between w-full pr-4 '>
                    {children}
                    {
                        isCompleted&&<Badge className='bg-sky-500 text-white pointer-events-none font-medium'>Completed</Badge>
                    }
                </div>
                
            </AccordionTrigger>
            <AccordionContent>
                <p>Duration: {duration}</p>
                <Editor readonly value={description!} />
            </AccordionContent>
        </AccordionItem>
    )
}

const  convertTimeToSeconds = (timeString: string): number=> {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);

    // Validate that the input has three parts
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        throw new Error('Invalid time format. Please use "hh:mm:ss".');
    }

    // Convert to total seconds
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    return totalSeconds;
}



const tohhmmss = (seconds:number):string =>{
    const padZero = (num:number):string =>num < 10 ? `0${num}` : `${num}`;
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds =Math.floor( seconds % 60);

    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
    return formattedTime;
}