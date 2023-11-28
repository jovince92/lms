import { useConfettiStore } from '@/Hooks/useConfettiStore';
import { cn } from '@/lib/utils';
import { Chapter, PageProps } from '@/types';
import { Inertia, Page } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import MuxPlayer from "@mux/mux-player-react"; 

import { Loader2 } from 'lucide-react';
import React, { FC, useMemo, useState } from 'react'
import { toast } from 'sonner';

interface Props{
    chapter:Chapter;
    isLastChapter:1|0;
    nextChapterId:number;
}

const VideoPlayer:FC<Props> = ({chapter,isLastChapter,nextChapterId}) => {
    const {onOpen} = useConfettiStore();
    const {title,video,id,course_id} = chapter;
    const [ready,setReady] = useState(false);
    const onEnded = () =>{
        Inertia.post(route('course.toggle',{course_id,id}),{
            is_completed:1
        },{
            onSuccess:()=>{
                if(!isLastChapter){
                    Inertia.get(route('course.chapter',{
                        course_id,
                        id:nextChapterId
                    }),{},{
                        onSuccess:()=>toast.success('Chapter Finished. Navigating to Next Chapter'),
                        onError:()=>toast.error('Something went Wrong. Please try again'),
                        preserveState:false
                    });
                }
                if(isLastChapter) {
                    toast.success('Congratulations!! You Have Finished The Course!');
                    onOpen();
                }
                
            },
            onError:()=>toast.error('Something went Wrong. Please try again'),
            preserveState:true,
            preserveScroll:true,
        });
    }

    return (
        <div className='aspect-video relative'>
            {
                !ready&&(
                    <div className='absolute inset-0 flex items-center justify-center bg-slate-950'>
                        <Loader2 className='h-8 w-8 animate-spin text-secondary' />
                    </div>
                )
            }
            <MuxPlayer accentColor='#960000' title={title} onCanPlay={()=>setReady(true)} onEnded={onEnded} autoPlay className={cn(!ready && 'hidden')} src={video} />
        </div>
    )
}

export default VideoPlayer