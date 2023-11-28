import { Chapter } from '@/types'
import { Inertia } from '@inertiajs/inertia';
import { Pencil, PlusCircle, VideoIcon } from 'lucide-react';
import React, { FC, useMemo, useState,lazy } from 'react'
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { SingeVideoDropZone } from '../SingeVideoDropZone';
import MuxPlayer from "@mux/mux-player-react"; 
interface Props{
    chapter:Chapter;
}

const ChapterVideoForm:FC<Props> = ({chapter}) => {
    const {id,video,course_id} = chapter;
    const [editing,setEditing] = useState(false);
    const [videoFile,setVideoFile] = useState<File>();
    const [loading,setLoading] = useState(false);
    const toggleEdit = () =>setEditing(current=>!current);
    
    

    const onChange = (file?:File) =>{
        if(!file) return;
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            //@ts-ignore
            const blob = new Blob([reader.result], { type: file.type });
            const url = URL.createObjectURL(blob);
            const video = document.createElement("video");
            video.src = url;
            video.addEventListener("loadedmetadata", () => {
            URL.revokeObjectURL(url);
            submit(file,tohhmmss(video.duration))
            });
        }
        
    }

    const submit = (file:File,duration:string) =>{
        const loader = toast.loading('Uploading Video... Do Not Leave or Close This Page...');
        Inertia.post(route('teacher.courses.chapters.update',{
            course_id,
            id
        }),{
            video:file,
            duration
        },{
            onStart:()=>setLoading(true),
            onSuccess:()=>{
                toast.success('Chapter Video Updated!')
                setEditing(false);
            },
            onError:e=>{
                toast.error('Something   Went Wrong. Please Try again!');
                console.error(e);
            },
            onFinish:()=>{
                setLoading(false);
                toast.dismiss(loader);
            },
            preserveScroll:true
        });
    }

    const label = useMemo(()=>!video ?<><PlusCircle className='h-4 w-4 mr-2' />Add a Video</>:<><Pencil className='w-4 h-4 mx-2' />Change Video</>,[video]);
    return (
        <div className='mt-3 border bg-secondary rounded-md p-3.5'>
            <div className='font-medium flex items-center justify-between'>
                <p>Chapter Video<span className='text-destructive text-[0.75rem] italic font-extralight'>*required</span></p>
                <Button onClick={toggleEdit} variant='ghost'>
                    {editing ? <>Cancel</>: label}
                </Button>
            </div>
            {
                !editing && (
                    !video? (
                        <div className='flex items-center justify-center h-60 bg-muted-foreground/20 rounded-md'>
                            <VideoIcon className='h-10 w-10' />
                        </div>
                    ):(
                        <div className='relative aspect-video mt-2'>
                            <MuxPlayer accentColor="#960000" streamType='on-demand' src={video} autoPlay={false}  />
                        </div>
                    )
                )
            }
            {
                editing&&(
                    <div>
                        <SingeVideoDropZone className='w-full' disabled={loading} onChange={onChange} />
                    </div>
                )
            }
        </div>
    )
}

export default ChapterVideoForm;

const tohhmmss = (seconds:number):string =>{
    const padZero = (num:number):string =>num < 10 ? `0${num}` : `${num}`;
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds =Math.floor( seconds % 60);

    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
    return formattedTime;


}