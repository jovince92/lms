import React, { FC, useEffect } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/Components/ui/sheet';
import { useUserFeedBackModal } from '@/Hooks/useUserFeedBackModal';
import { AvatarFallback, AvatarImage,Avatar } from '../ui/avatar';
import { format } from 'date-fns';

import StarRatings from 'react-star-ratings';
const UserFeedBackModal = () => {
    const {isOpen,onClose,course} = useUserFeedBackModal();

    useEffect(()=>console.log(course?.course_ratings),[course,isOpen]);

    if(!course) return null;
    const {course_ratings} = course;
    return (
        <Sheet  open={isOpen} onOpenChange={onClose}>
            <SheetContent side='left'>
                <SheetHeader>
                    <SheetTitle>Course Reviews</SheetTitle>
                    <SheetDescription>
                        Below are the most recent reviews for this course by students who have taken it.
                    </SheetDescription>
                </SheetHeader>
                <div className='h-full flex flex-col space-y-3.5 overflow-y-auto px-3.5 pb-20'>
                    {course_ratings.length===0&&<div className='text-center text-sm md:text-lg text-muted-foreground mt-10 w-full'>No Reviews For This Course Yet</div>   }
                    {
                        course_ratings.map(rating=>(
                            <div key={rating.id} className='px-3.5 py-2.5 flex flex-col space-y-1 border rounded-md'>
                                <div className='flex items-center justify-between text-sm text-muted-foreground'>
                                    <div className='flex items-center  space-x-2'>
                                        <div className='flex items-center justify-center'>
                                            <Avatar className="h-8 w-8 border border-idcsi">
                                                <AvatarImage src={rating.user.photo} alt="Photo" />
                                                <AvatarFallback>{`${rating.user.first_name.charAt(0)+rating.user.last_name.charAt(0)}`}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className='flex flex-col space-y-0'>
                                            <p>{`${rating.user.first_name}`}</p>
                                            <StarRatings
                                                rating={rating.rating}
                                                starRatedColor="yellow"
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension='10px'
                                                starSpacing='1px'
                                                />
                                        </div>
                                    </div>
                                    <div>
                                        {format(new Date(rating.created_at),'PP')}
                                    </div>
                                </div>
                                <div className='rounded-sm bg-secondary p-1.5'>
                                    <p className=''>{rating.feedback}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default UserFeedBackModal;
