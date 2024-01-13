import Logo from '@/Components/DashboardComponents/Logo'
import {Button} from '@/Components/ui/button'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/Components/ui/card'
import {Input} from '@/Components/ui/input'
import {Label} from '@/Components/ui/label'
import {cn} from '@/lib/utils'
import {Head, useForm} from '@inertiajs/inertia-react'
import {Loader2, Send} from 'lucide-react'
import React, {FC, FormEventHandler, useEffect, useState} from 'react'
import HRMS from './HRMS'
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/Components/ui/dialog'
import {ModeToggle} from '@/Components/ModeToggle'
import { toast } from 'sonner'


export const removeHTMLTags = (str:string):string =>{
    if(str==="") return str;
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    return doc.body.textContent || "";
}

const Login:FC = () => {
    const [open,setOpen] = useState(false);
    const [showForgotPassword,setShowForgotPassword] = useState(false);
    const {data,setData,processing,post,errors} = useForm({company_id:"",password:""})
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('signup'));
    }



    return (
        <>
            <Head title='Log In' />
            <form onSubmit={onSubmit} className='w-full h-full flex py-12 md:pt-0 md:items-center justify-center px-2.5  '>

                <Card className='w-full md:max-w-md h-fit relative shadow shadow-idcsi'>
                    <div className='absolute top-2 right-2'>
                        <ModeToggle />
                    </div>
                    <CardHeader>
                        <div  className={cn(processing&&'animate-pulse')}><Logo /></div>
                        <CardTitle >
                            {`${processing?'Signing In To LMS. Please wait...':'Sign In'}`}

                        </CardTitle>
                        <CardDescription>
                            Use your HRMS Credentials to Sign In
                        </CardDescription>
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
                                <Input required disabled={processing} value={data.password} onChange={({target})=>setData('password',target.value)} type='password' id="password" placeholder="Your HRMS Password" />
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter className="flex flex-col gap-y-2">
                        <div className='flex items-center justify-between w-full'>
                            {/* <Button onClick={()=>setShowForgotPassword(true)} type='button' variant='link'>Forgot Password?</Button> */}
                            <Button disabled={processing} variant='ddc' type='submit' className='w-full md:w-auto md:ml-auto'>
                                {processing&&<Loader2 className='w-4 h-4 mr-2 animate-spin' />}
                                Sign In
                            </Button>
                        </div>
                        {/*<div className='border-b  border-b-muted w-full' />

                        <Button type='button' onClick={()=>setOpen(true)} variant='link' className='text-muted-foreground text-sm font-light tracking-tight'>
                            New Student? Click here to Sign Up using your HRMS Credentials
                        </Button> */}

                    </CardFooter>
                </Card>
            </form>
            {/* <HRMS isOpen={open} onClose={()=>setOpen(false)} />
            <ForgotPassword isOpen={showForgotPassword} onClose={()=>setShowForgotPassword(false)} /> */}
        </>
    )
}

export default Login;


interface ForgotPasswordProps{
    isOpen?:boolean;
    onClose:()=>void;
}

const ForgotPassword:FC<ForgotPasswordProps> = ({isOpen,onClose}) =>{

    const {data,setData,post,reset,processing,errors} = useForm({company_id:""})

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('send_temporary_password'),{
            onSuccess:()=>toast.success('Done. Please check your email')
        });
    }

    useEffect(reset,[open]);

    return(
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogDescription>
                        Enter your Company ID below. <br />
                        We will send a temporary password to your email.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className='flex flex-col gap-y-2.5'>
                    <div className='flex flex-col space-y-1'>
                        <Label>Company ID:</Label>
                        <Input value={data.company_id} onChange={({target})=>setData('company_id',target.value)} disabled={processing} />
                        {errors.company_id && <p className='text-destructive text-xs w-full text-right'>{errors.company_id}</p> }
                    </div>
                    <Button disabled={processing} variant='ddc' className='ml-auto'>
                        { processing? <Loader2 className='h-5 w-5 mr-2 animate-spin' /> : <Send className='h-5 w-5 mr-2'/>}
                        {`${processing?'Sending...':'Send Email'}`}
                        
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
