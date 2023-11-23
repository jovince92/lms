import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { cn } from '@/lib/utils'
import { useForm } from '@inertiajs/inertia-react'
import { Loader2 } from 'lucide-react'
import React, { FC, FormEventHandler } from 'react'

const Login:FC = () => {

    const {data,setData,processing,reset,post,errors} = useForm({company_id:"",password:""})
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('login'));
    }

    

    return (
        <form onSubmit={onSubmit} className='w-full h-full flex py-12 md:pt-0 md:items-center justify-center px-2.5'>
            <Card className='w-full md:max-w-md h-fit'>
                <CardHeader>
                    <CardTitle className={cn(processing&&'animate-pulse')}>{`${processing?'Signing In. Please wait...':'Sign In'}`}</CardTitle>
                    <CardDescription>
                        Sign in with your HRMS Credentials
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
                            <Input required disabled={processing} value={data.password} onChange={({target})=>setData('password',target.value)} type='password' id="password" placeholder="Password" />
                        </div>
                    </div>
                    
                </CardContent>
                <CardFooter className="flex items-center">
                    <Button variant='ddc' type='submit' className='w-full md:w-auto md:ml-auto'>
                        {processing&&<Loader2 className='w-4 h-4 mr-2 animate-spin' />}
                        Sign In
                    </Button>
                </CardFooter>
            </Card>
        </form>
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