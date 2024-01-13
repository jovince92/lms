import { useRatingModal } from '@/Hooks/useRatingModal';
import React, { FormEventHandler, useCallback, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { Inertia, Page } from '@inertiajs/inertia';
import { PageProps } from '@/types';
import StarRatings from 'react-star-ratings';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Loader2, Trash2 } from 'lucide-react';
import { Textarea } from '../ui/textarea';

const RatingModal = () => {
    const {onClose,course,isOpen} = useRatingModal();
    const {user} = usePage<Page<PageProps>>().props.auth;
    const [loading,setLoading] = React.useState(false);
    const myReview = course?.course_ratings.find(rating=>rating.user_id===user.id);
    const {post,processing,reset,data,setData} = useForm({rating:0,feedback:""});
    
    const deleteReview = useCallback( () =>{
        if(!myReview) return;
        Inertia.post(route('ratings.destroy',{id:myReview.id}),{},{
            //preserveState:false,
            onStart:()=>setLoading(true),
            onFinish:()=>setLoading(false),
            onSuccess:()=>{
                toast.success('Review Deleted Successfully')
                onClose();
            },
            onError:e=>{
                console.error(e);
                toast.error('An Error Occured. Please Try Again Later')
            }
        });
    },[myReview]);

    useEffect(reset,[isOpen]);

    

    if(!course) return null;

    const onSubmit:FormEventHandler<HTMLFormElement> = e =>{
        e.preventDefault();
        if(data.rating===0) return toast.error('Please Select a Rating');
        post(route('ratings.store',{course_id:course.id}),{
            onSuccess:()=>{
                toast.success('Review Submitted'),
                onClose();
            },
            onError:e=>{
                console.error(e);
                toast.error('An Error Occured. Please Try Again Later')
            },
            //preserveState:false
        });
    }
    let content = myReview? (
        <Card>
            <CardHeader>
                <CardTitle>You Already Reviewed This Course</CardTitle>
                <CardDescription>You can delete your rating then submit a new review. </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col space-y-1'>
                    <div className='flex items-center space-x-2'>
                        <span className='text-sm text-muted-foreground'>Your Rating:</span>
                        <StarRatings rating={myReview.rating} starRatedColor="yellow" numberOfStars={5} name='rating' starDimension='15px' starSpacing='1px' />
                    </div>
                    <p className='text-sm text-muted-foreground'>Your Feedback:</p>
                    <p className='text-sm rounded p-1.5 bg-secondary'>{myReview.feedback}</p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={deleteReview} variant='ddc' size='sm'>
                    Delete Review
                    {
                        !loading?<Trash2 className='ml-2 w-5 h-5' />:<Loader2 className='ml-2 w-5 h-5 animate-spin' />
                    }
                </Button>
            </CardFooter>
        </Card>
    ):(
        <form onSubmit={onSubmit} className='block'>
            <p>Rate this course:</p>
            <div className='flex items-center space-x-2'>
                <span className='text-sm text-muted-foreground'>Your Rating:</span>
                <StarRatings changeRating={e=>setData('rating',e)} rating={data.rating} starRatedColor="yellow" numberOfStars={5} name='rating' starDimension='15px' starSpacing='1px' />
            </div>
            <div>
                <p className='text-sm text-muted-foreground'>Your Feedback:</p>
                <Textarea required value={data.feedback} onChange={({target})=>setData('feedback',target.value)} className='w-full rounded p-1.5 bg-secondary' placeholder='Enter your feedback here' />
            </div>
            <div className='w-full flex py-2.5'>
                <Button type='submit' variant='ddc' size='sm' className='ml-auto'>
                    Submit Review
                    {
                        processing?<Loader2 className='ml-2 w-5 h-5 animate-spin' />:null
                    }
                </Button>
            </div>
        </form>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Student Satisfaction Survey</DialogTitle>
                    <DialogDescription>
                        As part of our commitment to delivering exceptional online education, we invite you to rate your satisfaction with the course using the star rating system provided.
                    </DialogDescription>
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>
    )
}

export default RatingModal