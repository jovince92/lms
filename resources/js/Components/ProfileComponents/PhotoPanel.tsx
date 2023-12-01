import { PageProps } from '@/types';
import { Inertia, Page } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import { SingleImageDropzone } from '../SingeImageDropZone';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const PhotoPanel = () => {
    const [loading,setLoading] = useState(false);
    const {user} = usePage<Page<PageProps>>().props.auth;
    const onChange = (file?:File) =>{
        if(!file) return;
        Inertia.post(route('profile.update'),{
            photo:file
        },{
            onStart:()=>setLoading(true),
            onSuccess:()=>toast.success('Profile Photo Updated!'),
            onError:e=>{
                toast.error('Something   Went Wrong. Please Try again!');
                console.error(e);
            },
            onFinish:()=>setLoading(false),
            preserveScroll:true,
            preserveState:true
        });
    }
    return (
        <div className='w-full h-full flex flex-col space-y-3.5 md:pt-12 items-center'>
            <p className='text-muted-foreground'>Click the Image or Drag N' Drop Files to The Box Below</p>
            <div className='rounded-3xl border border-idcsi p-2.5 relative'>
                <SingleImageDropzone onChange={onChange} className='rounded-3xl w-48 h-48' value={user.photo} />
                {loading&&<div className='absolute inset-0 bg-gray-950/60 flex items-center justify-center  rounded-3xl'>
                    <Loader2 className='text-sky-500 h-8 w-8 animate-spin' />
                </div>}
            </div>
        </div>
    )
}

export default PhotoPanel