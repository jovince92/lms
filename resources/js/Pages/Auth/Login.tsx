import Logo from '@/Components/DashboardComponents/Logo'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog'
import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Separator } from '@/Components/ui/separator'
import { cn } from '@/lib/utils'
import { useForm } from '@inertiajs/inertia-react'
import { Loader2 } from 'lucide-react'
import React, { FC, FormEventHandler, ReactNode, useState } from 'react'

const Login:FC = () => {
    const [open,setOpen] = useState(false);
    const {data,setData,processing,reset,post,errors} = useForm({company_id:"",password:""})
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('login.store'));
    }

    

    return (
        <>
            <form onSubmit={onSubmit} className='w-full h-full flex py-12 md:pt-0 md:items-center justify-center px-2.5'>
                <Card className='w-full md:max-w-md h-fit'>
                    <CardHeader>
                        <div  className={cn(processing&&'animate-pulse')}><Logo /></div>
                        <CardTitle >
                            {`${processing?'Signing In To LMS. Please wait...':'Sign In'}`}
                            
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="id">Company ID</Label>
                                <Input required disabled={processing} value={data.company_id} onChange={({target})=>setData('company_id',target.value)} id="id" placeholder="Your Company ID" />
                                {errors.company_id && <p className='text-destructive text-xs w-full text-right'>{removeHTMLTags(errors.company_id)}</p> }
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input required disabled={processing} value={data.password} onChange={({target})=>setData('password',target.value)} type='password' id="password" placeholder="Password" />
                            </div>
                        </div>
                        
                    </CardContent>
                    <CardFooter className="flex flex-col gap-y-2">
                        <Button variant='ddc' type='submit' className='w-full md:w-auto md:ml-auto'>
                            {processing&&<Loader2 className='w-4 h-4 mr-2 animate-spin' />}
                            Sign In
                        </Button>
                        <div className='border-b  border-b-muted w-full' />
                        
                        <Button type='button' onClick={()=>setOpen(true)} variant='link' className='text-muted-foreground text-sm font-light tracking-tight'>
                            New Student? Click here to Sign Up using your HRMS Credentials
                        </Button>
                        
                    </CardFooter>
                </Card>
            </form>
            <HRMS isOpen={open} onClose={()=>setOpen(false)} />
        </>
    )
}

export default Login;

const removeHTMLTags = (str:string):string =>{
    if(str==="") return str;
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    const strippedString = doc.body.textContent || "";
    return strippedString;
}

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
                        <AlertDialogCancel type='button'>Cancel</AlertDialogCancel>
                        <Button variant='ddc' form='hrms' type='submit'>
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