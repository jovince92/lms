import { Attachment, Course } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import React, { FC, useState } from 'react'
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { FileIcon, Loader2, PlusCircle, XIcon } from 'lucide-react';
import { MultipleFileDropZone } from '../MultipleFileDropZone';


interface Props{
    course:Course;
}


const AttachmentForm:FC<Props> = ({course}) => {
    const {id,attachments} = course;
    const [editing,setEditing] = useState(false);
    const [image,setImage] = useState<File>();
    const [loading,setLoading] = useState(false);
    const toggleEdit = () =>setEditing(current=>!current);

    const onChange = (files?:File[]) =>{
        if(!files) return;
        const loader = toast.loading('Uploading Files. Do Not Leave or Close This Page...');
        Inertia.post(route('teacher.courses.attachments.store',{course_id:id}),{files},{
            onStart:()=>setLoading(true),
            onSuccess:()=>{
                toast.success('Attachments Uploaded!')
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
    return (
        <div className='mt-5 border bg-secondary rounded-md p-3.5'>
            <div className='font-medium flex items-center justify-between'>
                <div className='flex flex-col space-y-0.5'>                    
                    <p>Upload Resources</p>
                    
                </div>
                <Button onClick={toggleEdit} variant='ghost'>
                    {editing ? <>Cancel</>: <><PlusCircle className='h-4 w-4 mr-2' />Add a Resource/Attachment</>}
                </Button>
            </div>
            {editing&&<p className='text-center text-muted-foreground italic text-xs font-light tracking-tight'>Documents,Powerpoints,Spreadsheets,PDFs, and Images Only</p>}
            {
                (!editing && course.attachments.length<1 )&& <p className='text-sm mt-2 text-primary/80 italic'>No Attachments Uploaded to this Course</p>
            }
            {
                (!editing && course.attachments.length>0 )&& (
                    <div className='flex flex-col space-y-1.5'>
                        {
                            attachments.map(attachment=><AttachmentItem key={attachment.id} attachment={attachment} />)
                        }
                    </div>
                )
            }
            {
                editing&&<div><MultipleFileDropZone onChange={onChange} /></div>
            }
            
        </div>
    )
}

export default AttachmentForm;

interface AttachmentItemProps{
    attachment:Attachment;
}

const AttachmentItem:FC<AttachmentItemProps> = ({attachment}) =>{
    const {course_id,id} = attachment;
    const [deleting,setDeleting] = useState(false);
    const onDelete = () =>{
        Inertia.post(route('teacher.courses.attachments.destroy',{course_id,id}),{},{
            onStart:()=>setDeleting(true),
            onSuccess:()=>toast.success('Attachment Removed!'),
            onError:e=>{
                toast.error('Something   Went Wrong. Please Try again!');
                console.error(e);
            },
            onFinish:()=>setDeleting(false),
            preserveScroll:true
        });
    }
    return (
        <div className='flex items-center p-2.5 w-full bg-background border-border text-primary rounded-md'>
            <FileIcon className='h-4 w-4 mr-2 flex-shrink-0' />
            <p className='text-xs line-clamp-1'>{attachment.name}</p>
            {
                deleting ? <Loader2 className='h-4 w-4 animate-spin' />:<Button onClick={onDelete} className='ml-auto' variant='ghost' size='sm'><XIcon className='w-4 h-4' /></Button>
            }
        </div>
    );
}