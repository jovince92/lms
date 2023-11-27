import { cn } from '@/lib/utils';
import { Chapter } from '@/types';
import MuxPlayer from "@mux/mux-player-react"; 

import { Loader2 } from 'lucide-react';
import React, { FC, useState } from 'react'

interface Props{
    chapter:Chapter;
}

const VideoPlayer:FC<Props> = ({chapter}) => {
    const {title,video} = chapter;
    const [ready,setReady] = useState(false);
    return (
        <div className='aspect-video relative'>
            {
                !ready&&(
                    <div className='absolute inset-0 flex items-center justify-center bg-slate-950'>
                        <Loader2 className='h-8 w-8 animate-spin text-secondary' />
                    </div>
                )
            }
            <MuxPlayer accentColor='#960000' title={title} onCanPlay={()=>setReady(true)} onEnded={()=>{}} autoPlay className={cn(!ready && 'hidden')} src={video} />
        </div>
    )
}

export default VideoPlayer