import React, { FC, FormEventHandler } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog'
import { useForm } from '@inertiajs/inertia-react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Loader2 } from 'lucide-react';
import { removeHTMLTags } from './Login';


interface HRMSProps{
    onClose:()=>void;
    isOpen?:boolean;
}

const HRMS:FC<HRMSProps> = ({onClose,isOpen}) => {
    const {data,setData,processing,reset,post,errors} = useForm({company_id:"",password:""})
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('signup'));
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Sign Up To DDC LMS</AlertDialogTitle>
                        <AlertDialogDescription>Enter your HRMS Credentials to Continue</AlertDialogDescription>
                    </AlertDialogHeader>
                    <form className='flex flex-col space-y-3.5 pt-6' id='hrms' onSubmit={onSubmit}>
                        <div className='flex flex-col space-y-1'>
                            <Label htmlFor='id'>Company ID</Label>
                            <Input required disabled={processing} value={data.company_id} onChange={({target})=>setData('company_id',target.value)} id="id" placeholder="Your Company ID" />
                            {errors.company_id && <p className='text-destructive text-xs w-full text-right'>{removeHTMLTags(errors.company_id)}</p> }
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <Label htmlFor='password'>HRMS Password</Label>
                            <Input required disabled={processing} value={data.password} onChange={({target})=>setData('password',target.value)} type='password' id="password" placeholder="Your HRMS Password" />
                        </div>
                    </form>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={processing} type='button'>Cancel</AlertDialogCancel>
                        <Button disabled={processing} variant='ddc' form='hrms' type='submit'>
                            {
                                processing && <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                            }
                            Continue
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
        </AlertDialog>
    )
}

export default HRMS