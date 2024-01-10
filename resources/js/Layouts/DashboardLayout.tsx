import Navbar from '@/Components/DashboardComponents/Navbar';
import Sidebar from '@/Components/DashboardComponents/Sidebar';
import CategoryModal from '@/Components/Modals/CategoryModal';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/Components/ui/alert-dialog';
import { Button } from '@/Components/ui/button';
import { useDeptsAndPositions } from '@/Hooks/useDeptsAndPositions';
import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import { Inertia, Page } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { ExternalLink, Loader2, XCircle } from 'lucide-react';
import React, { FC, ReactNode, useEffect, useState } from 'react'

interface Props{
    children:ReactNode;
    className?:string;
}

const DashboardLayout:FC<Props> = ({children,className}) => {
    // const [showEmailReminder,setShowEmailReminder] = useState(false);
    // useEffect(()=>{
    //     if((!user.email || user.email.length<5)&& !route().current('profile.index')) setShowEmailReminder(true);
    // },[]);
    const {user} = usePage<Page<PageProps>>().props.auth;
   

    return (
        <>
            <div className={cn('h-full',className)}>
                <div className='h-[5rem] md:pl-56 fixed inset-y-0 w-full z-50'>
                    <Navbar />
                </div>
                <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>
                    <Sidebar />
                </div>
                <main className='md:pl-56 pt-[5rem] h-full pb-3.5'>
                    {children}
                </main>
            </div>
            <CategoryModal />
            {/* <EmailReminder isOpen={showEmailReminder} onClose={()=>setShowEmailReminder(false)} /> */}
        </>
    )
}

export default DashboardLayout;

// interface EmailReminderProps{
//     isOpen?:boolean;
//     onClose:()=>void;
// }

// const EmailReminder:FC<EmailReminderProps> = ({isOpen,onClose}) =>{
//     const [loading,setLoading] = useState(false);
//     const navigate = () =>{
//         Inertia.get(route('profile.index'),{},{
//             onStart:()=>setLoading(true),
//             onFinish:()=>setLoading(false)
//         });
//     }
//     return(

//         <AlertDialog open={isOpen}>
//             <AlertDialogContent>
//                 <AlertDialogHeader>
//                     <AlertDialogTitle>Email Address Not Set</AlertDialogTitle>
//                     <AlertDialogDescription>
//                         You have not set an Email Address for your account. <br />
//                         Please go to your profile settings and set an email. <br />
//                         A valid Email Address is needed in case you forgot your password.
//                     </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                 <Button disabled={loading} size='sm' variant='secondary' onClick={onClose}>
//                     <XCircle className='h-5 w-5 mr-2'/>
//                     Close
//                 </Button>
//                 <Button disabled={loading} variant='outline' size='sm' onClick={navigate}>
//                     {loading? <Loader2 className='h-5 w-5 mr-2 animate-spin'/> :<ExternalLink className='h-5 w-5 mr-2' />}
//                     Go To Profile Settings
//                 </Button>
//                 </AlertDialogFooter>
//             </AlertDialogContent>
//         </AlertDialog>

//     );
// }