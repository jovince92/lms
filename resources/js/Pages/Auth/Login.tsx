import Logo from '@/Components/DashboardComponents/Logo'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog'
import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Separator } from '@/Components/ui/separator'
import { cn } from '@/lib/utils'
import { useForm } from '@inertiajs/inertia-react'
import { Loader2, Send } from 'lucide-react'
import React, { FC, FormEventHandler, ReactNode, useState } from 'react'
import HRMS from './HRMS'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/ui/dialog'
import { ModeToggle } from '@/Components/ModeToggle'


export const removeHTMLTags = (str:string):string =>{
    if(str==="") return str;
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    const strippedString = doc.body.textContent || "";
    return strippedString;
}

const Login:FC = () => {
    const [open,setOpen] = useState(false);
    const [showForgotPassword,setShowForgotPassword] = useState(false);
    const {data,setData,processing,reset,post,errors} = useForm({company_id:"",password:""})
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('login.store'));
    }

    

    return (
        <>
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
                        <div className='flex items-center justify-between w-full'>
                            <Button onClick={()=>setShowForgotPassword(true)} type='button' variant='link'>Forgot Password?</Button>
                            <Button variant='ddc' type='submit' className='w-full md:w-auto md:ml-auto'>
                                {processing&&<Loader2 className='w-4 h-4 mr-2 animate-spin' />}
                                Sign In
                            </Button>
                        </div>
                        <div className='border-b  border-b-muted w-full' />
                        
                        <Button type='button' onClick={()=>setOpen(true)} variant='link' className='text-muted-foreground text-sm font-light tracking-tight'>
                            New Student? Click here to Sign Up using your HRMS Credentials
                        </Button>
                        
                    </CardFooter>
                </Card>
            </form>
            <HRMS isOpen={open} onClose={()=>setOpen(false)} />
            <ForgotPassword isOpen={showForgotPassword} onClose={()=>setShowForgotPassword(false)} />
        </>
    )
}

export default Login;


interface ForgotPasswordProps{
    isOpen?:boolean;
    onClose:()=>void;
}

const ForgotPassword:FC<ForgotPasswordProps> = ({isOpen,onClose}) =>{
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
                <form className='flex flex-col gap-y-2.5'>
                    <div className='flex flex-col space-y-1'>
                        <Label>Company ID:</Label>
                        <Input />
                    </div>
                    <Button variant='ddc' className='ml-auto'>
                        <Send className='h-5 w-5 mr-2' />
                        Send Email
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
